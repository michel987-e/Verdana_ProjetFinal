const sqlite3 = require('sqlite3').verbose();
const WebSocket = require('ws');
const path = require('path');
const fetch = require('node-fetch');
const dbPath = path.resolve(__dirname, 'plante.db');
const db = new sqlite3.Database(dbPath);
console.log('Base SQLite utilisée :', dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pot_id INTEGER NOT NULL,
    temperature FLOAT,
    humidity FLOAT,
    light FLOAT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const wss = new WebSocket.Server({ port: 8080 });
let clients = [];

wss.on('connection', ws => {
  console.log('Client WebSocket connecté');
  ws.pot_id = 1;
  clients.push(ws);

  db.get(`SELECT temperature, humidity, light, timestamp 
          FROM sensor_data 
          ORDER BY id DESC LIMIT 1`, (err, row) => {
    if (!err && row) {
      const lastData = {
        temp: row.temperature,
        hum: row.humidity,
        lux: row.light,
        date: row.timestamp
      };
      ws.send(JSON.stringify(lastData));
    }
  });

  ws.on('message', message => {
    try {
      const msg = JSON.parse(message);
      if (msg.type === 'selectPlant' && msg.plantId) {
        ws.pot_id = parseInt(msg.plantId, 10);
      }
    } catch (e) {
      console.error('Erreur parsing WebSocket message:', e);
    }
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
    console.log('Client WebSocket déconnecté');
  });
});

function insererMesure(data) {
  return new Promise((resolve) => {
    const query = `INSERT INTO sensor_data (pot_id, temperature, humidity, light) VALUES (?, ?, ?, ?)`;
    db.run(query, [data.pot_id, data.temp, data.hum, data.lux], function () {
      resolve(this.lastID);
    });
  });
}

const ESP32_IP = 'http://192.168.116.197/data'; 

setInterval(async () => {
  try {
    const res = await fetch(ESP32_IP);
    const json = await res.json();
    const data = {
      pot_id: 1,
      temp: json.temperature,
      hum: json.humidity,
      lux: json.light
    };

    const id = await insererMesure(data);
    console.log('Mesure insérée avec id', id);

    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });

    console.log('Données envoyées aux clients:', data);

  } catch (err) {
    console.error('Erreur lors de la récupération des données ESP32:', err);
  }
}, 5000); 
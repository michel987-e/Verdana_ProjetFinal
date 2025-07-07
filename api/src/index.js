const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const sqlite3 = require('sqlite3').verbose();
const WebSocket = require('ws');
const path = require('path');

const port = new SerialPort({ path: 'COM5', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

const dbPath = path.resolve(__dirname, 'plante.db');
const db = new sqlite3.Database(dbPath);
console.log('Base SQLite utilisée:', dbPath);

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
    if (err) {
    } else if (row) {
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
      console.error('Erreur parsing message WebSocket:', e);
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

let data = { temp: null, hum: null, lux: null };

parser.on('data', line => {
  line = line.trim();
  console.log('> ', line);

  if (line.startsWith("Température")) {
    data.temp = parseFloat(line.split(":")[1]);
  } else if (line.startsWith("Humidité")) {
    data.hum = parseFloat(line.split(":")[1]);
  } else if (line.startsWith("Luminosité")) {
    data.lux = parseFloat(line.split(":")[1]);
  }

  if (data.temp !== null && data.hum !== null && data.lux !== null) {
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        const mesure = {
          pot_id: client.pot_id || 1,
          temp: data.temp,
          hum: data.hum,
          lux: data.lux
        };
        insererMesure(mesure)
          .then(id => console.log('id', id));
        client.send(JSON.stringify(mesure));
        console.log('Envoi WebSocket:', JSON.stringify(mesure));
      }
    });
    data = { temp: null, hum: null, lux: null };
  }
});

/*const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const WebSocket = require('ws');

const port = new SerialPort({ path: 'COM5', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

const wss = new WebSocket.Server({ port: 8080 });
let clients = [];
wss.on('connection', ws => {
  clients.push(ws);
  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

let data = { pot_id: 1, temp: null, hum: null, lux: null };

parser.on('data', line => {
  line = line.trim();
  if (line.startsWith("Température")) {
    data.temp = parseFloat(line.split(":")[1]);
  } else if (line.startsWith("Humidité")) {
    data.hum = parseFloat(line.split(":")[1]);
  } else if (line.startsWith("Luminosité")) {
    data.lux = parseFloat(line.split(":")[1]);
  }

  if (data.temp !== null && data.hum !== null && data.lux !== null) {
    const jsonData = JSON.stringify(data);
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(jsonData);
      }
    });
    data = { pot_id: 1, temp: null, hum: null, lux: null };
  }
});*/
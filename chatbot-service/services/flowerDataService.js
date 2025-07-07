const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'flowers.json');
let plants = [];

try {
  const data = fs.readFileSync(filePath, 'utf-8');
  plants = JSON.parse(data);
} catch (err) {
  console.error(`Error while loading flower's data: `, err);
}

function findFlowerInfo(plantName) {
  return plants.find(p => p.name.toLowerCase() === plantName.toLowerCase());
}

module.exports = { findFlowerInfo }
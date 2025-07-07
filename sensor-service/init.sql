CREATE TABLE IF NOT EXISTS sensor_data (
  id SERIAL PRIMARY KEY,
  pot_id INTEGER NOT NULL,
  temperature FLOAT,
  humidity FLOAT,
  soil FLOAT,
  light FLOAT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name VARCHAR(100),
  city VARCHAR(100),
  country VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE flowers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100),
    plant_type VARCHAR(100),
    location VARCHAR(100),
    temp_min FLOAT,
    temp_max FLOAT,
    humidity_min FLOAT,
    humidity_max FLOAT,
    soil_min FLOAT,
    soil_max FLOAT,
    light_min FLOAT,
    light_max FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensor_data (
    id SERIAL PRIMARY KEY,
    pot_id INT NOT NULL REFERENCES flowers(id) ON DELETE CASCADE,
    temperature FLOAT,
    humidity FLOAT,
    soil FLOAT,
    light FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

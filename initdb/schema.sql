CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name VARCHAR(100),
  city VARCHAR(100),
  country VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

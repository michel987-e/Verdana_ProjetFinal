CREATE TABLE IF NOT EXISTS flowers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
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

INSERT INTO flowers (
  user_id,
  name,
  plant_type,
  temp_min,
  temp_max,
  humidity_min,
  humidity_max,
  soil_min,
  soil_max,
  light_min,
  light_max
  )
VALUES 
  (1, 'Rose', 'Rosa', 5, 30, 40, 85, 50, 90, 10000, 100000),

ON CONFLICT DO NOTHING;

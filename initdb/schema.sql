CREATE TABLE IF NOT EXISTS flowers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  temp_min FLOAT NOT NULL,
  temp_max FLOAT NOT NULL,
  humidity_min FLOAT NOT NULL,
  humidite_max FLOAT NOT NULL,
  light_min FLOAT NOT NULL,
  light_max FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mdp TEXT NOT NULL,
  localisation TEXT
);

CREATE TABLE IF NOT EXISTS users_flowers (
  id_flower int not null references flowers(id) on delete cascade,
  id_user int not null references users(id) on delete cascade,
  unique(id_flower, id_user)
);

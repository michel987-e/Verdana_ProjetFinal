-- init.sql
CREATE TABLE IF NOT EXISTS notification (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT now()
);
INSERT INTO notification (title, message) VALUES ('Welcome', 'Notification service started');

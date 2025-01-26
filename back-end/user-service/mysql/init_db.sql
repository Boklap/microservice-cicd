CREATE DATABASE IF NOT EXISTS bokman;

USE bokman;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users ( name, email ) VALUES
('Bokman', 'bokman.senpai@gmail.com'),
('Kurlap', 'kurlap.senpai@gmail.com');
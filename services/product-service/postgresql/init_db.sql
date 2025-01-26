CREATE DATABASE bokman;

\c bokman;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products ( name, price ) VALUES
('Jacket', 20000),
('Trouser', 30000)
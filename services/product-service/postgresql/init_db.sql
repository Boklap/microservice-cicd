-- Check if the database 'bokman' exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'bokman') THEN
        -- Create the database if it doesn't exist
        CREATE DATABASE bokman;
    END IF;
END $$;

-- Connect to the 'bokman' database
\c bokman

-- Check if the 'products' table exists, and create it only if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products') THEN
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    END IF;
END $$;

-- Insert default data if the 'products' table is empty
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM products) THEN
        INSERT INTO products (name, price) VALUES
        ('Jacket', 20000),
        ('Trouser', 30000);
    END IF;
END $$;

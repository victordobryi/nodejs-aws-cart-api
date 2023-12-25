-- Load the uuid-ossp extension
CREATE extension if not exists "uuid-ossp";

-- Insert users
INSERT INTO users (name, email, password)
VALUES
    ('John Doe', 'john.doe@example.com', 'password123'),
    ('Jane Smith', 'jane.smith@example.com', 'securepass'),
    ('Bob Johnson', 'bob.johnson@example.com', '12345');


-- Insert carts with existing user_id values
INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES 
    (uuid_generate_v4(), (SELECT id FROM users WHERE name = 'John Doe'), current_timestamp, current_timestamp, 'OPEN'),
    (uuid_generate_v4(), (SELECT id FROM users WHERE name = 'Jane Smith'), current_timestamp, current_timestamp, 'ORDERED');

-- Insert cart items
INSERT INTO cart_items (cart_id, product_id, count)
VALUES
    ((SELECT id FROM carts WHERE status = 'OPEN' LIMIT 1), uuid_generate_v4(), 3),
    ((SELECT id FROM carts WHERE status = 'ORDERED' LIMIT 1), uuid_generate_v4(), 2),
    ((SELECT id FROM carts WHERE status = 'OPEN' LIMIT 1), uuid_generate_v4(), 1);

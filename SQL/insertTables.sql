-- Load the uuid-ossp extension
CREATE extension if not exists "uuid-ossp";

-- Insert users
INSERT INTO users (name, email, password)
VALUES
    ('John Doe', 'john.doe@example.com', 'password123'),
    ('Jane Smith', 'jane.smith@example.com', 'securepass'),
    ('Bob Johnson', 'bob.johnson@example.com', '12345');

-- Insert products
INSERT INTO products (id, title, description, price, count)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Product 1', 'Description for Product 1', 19.99, 100),
  ('22222222-2222-2222-2222-222222222222', 'Product 2', 'Description for Product 2', 29.99, 50),
  ('33333333-3333-3333-3333-333333333333', 'Product 3', 'Description for Product 3', 39.99, 75);


-- Insert carts with existing user_id values
INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES 
    (uuid_generate_v4(), (SELECT id FROM users WHERE name = 'John Doe'), current_timestamp, current_timestamp, 'OPEN'),
    (uuid_generate_v4(), (SELECT id FROM users WHERE name = 'Jane Smith'), current_timestamp, current_timestamp, 'ORDERED');

-- Insert cart items
INSERT INTO cart_items (cart_id, product_id, count)
VALUES
    ((SELECT id FROM carts WHERE status = 'OPEN' LIMIT 1), '11111111-1111-1111-1111-111111111111', 3),
    ((SELECT id FROM carts WHERE status = 'ORDERED' LIMIT 1), '22222222-2222-2222-2222-222222222222', 2)

-- Insert orders
INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total) VALUES
    ((SELECT id FROM users WHERE name = 'John Doe'), (SELECT id FROM carts WHERE status = 'OPEN' LIMIT 1), '{"method": "credit_card", "amount": 50}', '{"address": "test address 1"}', 'Fast delivery', 'PROCESSING', 50.00),
    ((SELECT id FROM users WHERE name = 'Jane Smith'), (SELECT id FROM carts WHERE status = 'ORDERED' LIMIT 1), '{"method": "paypal", "amount": 75}', '{"address": "test address 2"}', 'Standard delivery', 'SHIPPED', 75.00);

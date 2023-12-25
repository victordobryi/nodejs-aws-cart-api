-- Load the uuid-ossp extension
create extension if not exists "uuid-ossp";

-- Create User model table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT NOT NULL
);

-- Create products table
CREATE TABLE products (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    count INTEGER NOT NULL
);


-- Create Order Status enum type
CREATE TYPE order_status AS ENUM ('OPEN', 'ORDERED');

-- Create Cart model table
CREATE TABLE carts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  status order_status
);

-- Create Cart Item model table
CREATE TABLE cart_items (
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  count INT NOT NULL
  PRIMARY KEY (cart_id, product_id)
);


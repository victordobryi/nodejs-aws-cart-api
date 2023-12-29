-- Load the uuid-ossp extension
create extension if not exists "uuid-ossp";

DROP TABLE if exists users cascade;

-- Create User model table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT NOT NULL
);

DROP TABLE if exists products cascade;

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

DROP TABLE if exists carts cascade;

-- Create Cart model table
CREATE TABLE carts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  status order_status
);

DROP TABLE if exists cart_items cascade;

-- Create Cart Item model table
CREATE TABLE cart_items (
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  count INT NOT NULL
  PRIMARY KEY (cart_id, product_id)
);

-- Create Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    cart_id UUID REFERENCES carts(id),
    payment JSON,
    delivery JSON,
    comments TEXT,
    status VARCHAR(64),
    total NUMERIC
);


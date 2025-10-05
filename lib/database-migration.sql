-- Supabase Database Migration for Ayur Shuddhi Wellness
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    receipt_url TEXT,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);



-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);


-- Enable Row Level Security (RLS) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;


-- Create policies for public access (adjust as needed for your security requirements)
-- Note: These are basic policies. You may want to customize them based on your authentication needs.

-- Users table policies
CREATE POLICY "Users are viewable by everyone" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can be inserted by everyone" ON users
    FOR INSERT WITH CHECK (true);

-- Payments table policies
CREATE POLICY "Payments are viewable by everyone" ON payments
    FOR SELECT USING (true);

CREATE POLICY "Payments can be inserted by everyone" ON payments
    FOR INSERT WITH CHECK (true);

-- Posts table policies
CREATE POLICY "Posts are viewable by everyone" ON posts
    FOR SELECT USING (true);

CREATE POLICY "Posts can be inserted by everyone" ON posts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Posts can be updated by everyone" ON posts
    FOR UPDATE USING (true);

CREATE POLICY "Posts can be deleted by everyone" ON posts
    FOR DELETE USING (true);



-- Insert some sample data for testing (optional)
INSERT INTO users (name, email, phone) VALUES 
    ('John Doe', 'john.doe@example.com', '+1234567890'),
    ('Jane Smith', 'jane.smith@example.com', '+0987654321')
ON CONFLICT DO NOTHING;

INSERT INTO posts (title, content, image_url) VALUES 
    ('Welcome to Ayur Shuddhi Wellness', 'Experience the ancient wisdom of Ayurveda with our comprehensive wellness programs.', '/images/hero/Tree.jpg'),
    ('Benefits of Ayurvedic Treatment', 'Discover how Ayurvedic treatments can help restore balance and promote natural healing.', '/images/services/ayurveda.jpg')
ON CONFLICT DO NOTHING;

-- Create a view for user payment summary (optional)
CREATE OR REPLACE VIEW user_payment_summary AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.phone,
    u.created_at,
    COUNT(p.id) as total_payments,
    COALESCE(SUM(p.amount), 0) as total_amount_paid
FROM users u
LEFT JOIN payments p ON u.id = p.user_id
GROUP BY u.id, u.name, u.email, u.phone, u.created_at
ORDER BY u.created_at DESC;
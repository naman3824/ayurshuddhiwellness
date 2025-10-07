-- Admin Messages RLS Policies Only
-- Run this SQL in your Supabase SQL Editor to add the missing admin_messages policies

-- Admin messages table policies
CREATE POLICY "Admin messages are viewable by everyone" ON admin_messages
    FOR SELECT USING (true);

CREATE POLICY "Admin messages can be inserted by everyone" ON admin_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin messages can be updated by everyone" ON admin_messages
    FOR UPDATE USING (true);

CREATE POLICY "Admin messages can be deleted by everyone" ON admin_messages
    FOR DELETE USING (true);
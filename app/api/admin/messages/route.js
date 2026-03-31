import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateFileServer } from '../../../../utils/secureFileUpload';
import { validateCSRFToken } from '../../../../utils/csrf';
import { validateAdminMessage } from '../../../../utils/inputValidation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET - Fetch all active admin messages
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('admin_messages')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      // If the table doesn't exist or query fails, return empty array gracefully
      // This prevents console errors when admin_messages table hasn't been created yet
      console.warn('Admin messages fetch skipped:', error.message);
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: data || [] });
  } catch (error) {
    // Return empty messages on any unexpected error so the popup simply doesn't show
    console.warn('Admin messages unavailable:', error.message);
    return NextResponse.json({ messages: [] });
  }
}

// POST - Create new admin message
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, image_url, message_type, admin_key, filename, mimeType, csrf_token } = body;

    // Verify CSRF token
    const cookieToken = request.cookies.get('csrf_token')?.value;
    if (!validateCSRFToken(csrf_token, cookieToken)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    // Validate and sanitize input
    const validation = validateAdminMessage({ title, content, message_type, admin_key });
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { title: sanitizedTitle, content: sanitizedContent, message_type: sanitizedType, admin_key: sanitizedKey } = validation.sanitized;

    // Verify admin key
    if (sanitizedKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Additional validation for image messages
    if (sanitizedType === 'image' && !image_url) {
      return NextResponse.json({ error: 'Image URL is required for image messages' }, { status: 400 });
    }

    // Validate image if provided
    if (sanitizedType === 'image' && image_url) {
      const fileValidation = validateFileServer(image_url, filename || 'image', mimeType || 'image/jpeg');
      if (!fileValidation.success) {
        return NextResponse.json({ error: `File validation failed: ${fileValidation.error}` }, { status: 400 });
      }
    }

    const { data, error } = await supabase
      .from('admin_messages')
      .insert([
        {
          title: sanitizedTitle,
          content: sanitizedContent,
          image_url: image_url || null,
          message_type: sanitizedType,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating admin message:', error);
      return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message created successfully', data: data[0] });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Deactivate admin message
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('id');
    const adminKey = searchParams.get('admin_key');

    // Verify admin key
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('admin_messages')
      .update({ is_active: false })
      .eq('id', messageId);

    if (error) {
      console.error('Error deactivating admin message:', error);
      return NextResponse.json({ error: 'Failed to deactivate message' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message deactivated successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
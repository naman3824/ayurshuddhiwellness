import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateFileServer } from '../../../../../utils/secureFileUpload';
import { validateCSRFToken } from '../../../../../utils/csrf';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET - Fetch a specific blog post by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update a specific blog post (Admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, image_url, admin_key, filename, mimeType, csrf_token } = body;

    // Verify CSRF token
    const cookieToken = request.cookies.get('csrf_token')?.value;
    if (!validateCSRFToken(csrf_token, cookieToken)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    // Verify admin key
    if (admin_key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Validate image if provided
    if (image_url) {
      const fileValidation = validateFileServer(image_url, filename || 'image', mimeType || 'image/jpeg');
      if (!fileValidation.success) {
        return NextResponse.json({ error: `File validation failed: ${fileValidation.error}` }, { status: 400 });
      }
    }

    // Update blog post
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: title.trim(),
        content: content.trim(),
        image_url: image_url || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Blog post updated successfully', 
      post: data 
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a specific blog post (Admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { admin_key, csrf_token } = body;

    // Verify CSRF token
    const cookieToken = request.cookies.get('csrf_token')?.value;
    if (!validateCSRFToken(csrf_token, cookieToken)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    // Verify admin key
    if (admin_key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // Delete blog post
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
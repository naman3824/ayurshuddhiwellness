import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateFileServer } from '../../../../utils/secureFileUpload';
import { validateCSRFToken } from '../../../../utils/csrf';
import { validateBlogPost } from '../../../../utils/inputValidation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET - Fetch all published blog posts
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }

    return NextResponse.json({ posts: data || [] });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new blog post (Admin only)
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, image_url, admin_key, filename, mimeType, csrf_token } = body;

    // Verify CSRF token
    const cookieToken = request.cookies.get('csrf_token')?.value;
    if (!validateCSRFToken(csrf_token, cookieToken)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    // Validate and sanitize input
    const validation = validateBlogPost({ title, content, admin_key });
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { title: sanitizedTitle, content: sanitizedContent, admin_key: sanitizedKey } = validation.sanitized;

    // Verify admin key
    if (sanitizedKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate image if provided
    if (image_url) {
      const fileValidation = validateFileServer(image_url, filename || 'image', mimeType || 'image/jpeg');
      if (!fileValidation.success) {
        return NextResponse.json({ error: `File validation failed: ${fileValidation.error}` }, { status: 400 });
      }
    }

    // Create blog post
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: sanitizedTitle,
          content: sanitizedContent,
          image_url: imageData || null,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Blog post created successfully', 
      post: data 
    }, { status: 201 });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
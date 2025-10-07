import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { key } = await request.json();
    
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    // Validate against environment variable
    const validKey = process.env.ADMIN_KEY;
    
    if (key === validKey) {
      return NextResponse.json({ valid: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
    }
  } catch (error) {
    console.error('Key validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
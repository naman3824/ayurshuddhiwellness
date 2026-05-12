import { NextResponse } from 'next/server';
import { generateCSRFToken } from '../../../utils/csrf';

export async function GET() {
  try {
    const token = generateCSRFToken();
    
    const response = NextResponse.json({ 
      token,
      success: true 
    });
    
    // Set CSRF token in httpOnly cookie for additional security
    response.cookies.set('csrf_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });
    
    return response;
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    return NextResponse.json({ 
      error: 'Failed to generate CSRF token',
      success: false 
    }, { status: 500 });
  }
}
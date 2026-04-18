import { NextResponse } from 'next/server';

export function middleware(request) {
  // All route protection is now handled client-side via AuthContext + ProtectedRoute.
  // This middleware only handles i18n redirects or other non-auth concerns.
  return NextResponse.next();
}

export const config = {
  // No longer matching /admin routes — client-side guards handle access control
  matcher: [],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if the user's browser has our secure session cookie
  const authCookie = req.cookies.get('admin_token');

  const isTryingToAccessAdmin = req.nextUrl.pathname.startsWith('/admin');
  const isTryingToLogin = req.nextUrl.pathname.startsWith('/login');

  // 1. If they want admin but aren't logged in -> Redirect to Login Page
  if (isTryingToAccessAdmin && !authCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2. If they are already logged in but go to the login page -> Redirect to Admin
  if (isTryingToLogin && authCookie) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // 3. Otherwise, let them proceed normally
  return NextResponse.next();
}

export const config = {
  // We want the middleware to watch both the admin and login routes
  matcher: ['/admin/:path*', '/login'],
};
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;

  // Allow access to login page
  if (request.nextUrl.pathname === '/login') {
    if (token) {
      // Already logged in → redirect to admin
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Protect /admin and all sub-routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jose.jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      // Invalid/expired token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('admin-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
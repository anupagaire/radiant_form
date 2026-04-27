// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (email === 'admin@radiant.com' && password === 'radiant123') {
      const token = await new jose.SignJWT({
        id: '1',
        email: 'admin@radiant.com',
        name: 'Admin',
        role: 'admin',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // 7 days
        .sign(secret);

      const response = NextResponse.json({ success: true });

      response.cookies.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
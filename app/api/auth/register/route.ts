import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Invalid/Missing environment variable: "JWT_SECRET"');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, provider } = body;

    // TODO: Implement actual registration logic here
    // This is a mock response for now
    if (provider === 'google') {
      return NextResponse.json({
        id: '1',
        name: name || 'Google User',
        email: email
      });
    }

    // Mock email/password registration
    if (name && email && password) {
      return NextResponse.json({
        id: '1',
        name: name,
        email: email
      });
    }

    return NextResponse.json(
      { error: 'Invalid registration data' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
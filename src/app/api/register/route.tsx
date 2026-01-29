import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  let body 
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { email, password, firstName, lastName } = body;

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json({ error: `Missing field(s)` }, { status: 400 });
  }

  try {

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date();
    const updatedAt = new Date();

    await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        hashedPassword,
        createdAt,
        updatedAt
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

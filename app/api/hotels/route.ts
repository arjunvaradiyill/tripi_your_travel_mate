import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const hotels = await db.collection('hotels').find({}).toArray();
    
    return NextResponse.json(hotels);
  } catch (error) {
    console.error('Failed to fetch hotels:', error);
    return NextResponse.json(
      { message: 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, location, price, rating, image, description } = await request.json();

    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection('hotels').insertOne({
      name,
      location,
      price,
      rating,
      image,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({
      id: result.insertedId,
      name,
      location,
      price,
      rating,
      image,
      description
    });
  } catch (error) {
    console.error('Failed to create hotel:', error);
    return NextResponse.json(
      { message: 'Failed to create hotel' },
      { status: 500 }
    );
  }
} 
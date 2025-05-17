import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const places = await db.collection('places').find({}).toArray();
    
    return NextResponse.json(places);
  } catch (error) {
    console.error('Failed to fetch places:', error);
    return NextResponse.json(
      { message: 'Failed to fetch places' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, location, description, image, rating, price } = await request.json();

    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection('places').insertOne({
      name,
      location,
      description,
      image,
      rating,
      price,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({
      id: result.insertedId,
      name,
      location,
      description,
      image,
      rating,
      price
    });
  } catch (error) {
    console.error('Failed to create place:', error);
    return NextResponse.json(
      { message: 'Failed to create place' },
      { status: 500 }
    );
  }
} 
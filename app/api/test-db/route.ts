import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('tripi');
    
    // Test the connection by getting collection stats
    const hotelsCount = await db.collection('hotels').countDocuments();
    const placesCount = await db.collection('places').countDocuments();
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      data: {
        database: 'tripi',
        collections: {
          hotels: hotelsCount,
          places: placesCount
        }
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to database',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 
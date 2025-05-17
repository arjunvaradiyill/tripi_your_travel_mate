import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get total users count
    const totalUsers = await db.collection('users').countDocuments();

    // Get total bookings count
    const totalBookings = await db.collection('bookings').countDocuments();

    // Get total packages count
    const totalPackages = await db.collection('packages').countDocuments();

    // Get recent bookings with user and package details
    const recentBookings = await db.collection('bookings')
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'packages',
            localField: 'packageId',
            foreignField: '_id',
            as: 'package'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $unwind: '$package'
        },
        {
          $project: {
            _id: 1,
            userName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
            packageName: '$package.name',
            date: 1,
            status: 1
          }
        },
        {
          $sort: { date: -1 }
        },
        {
          $limit: 5
        }
      ])
      .toArray();

    return NextResponse.json({
      totalUsers,
      totalBookings,
      totalPackages,
      recentBookings
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 
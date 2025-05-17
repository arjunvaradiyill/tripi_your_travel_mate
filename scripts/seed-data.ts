import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const hotels = [
  {
    name: "Grand Hotel",
    location: "New York",
    price: 299,
    rating: 4.5,
    image: "/images/hotels/grand-hotel.jpg",
    description: "Luxury hotel in the heart of Manhattan",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Seaside Resort",
    location: "Miami",
    price: 399,
    rating: 4.8,
    image: "/images/hotels/seaside-resort.jpg",
    description: "Beachfront resort with ocean views",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mountain Lodge",
    location: "Denver",
    price: 199,
    rating: 4.3,
    image: "/images/hotels/mountain-lodge.jpg",
    description: "Cozy mountain retreat with scenic views",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const places = [
  {
    name: "Central Park",
    location: "New York",
    description: "Iconic urban park in Manhattan",
    image: "/images/places/central-park.jpg",
    rating: 4.7,
    price: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "South Beach",
    location: "Miami",
    description: "Famous beach with art deco architecture",
    image: "/images/places/south-beach.jpg",
    rating: 4.6,
    price: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Rocky Mountains",
    location: "Denver",
    description: "Majestic mountain range with hiking trails",
    image: "/images/places/rocky-mountains.jpg",
    rating: 4.9,
    price: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedData() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    console.log('Using database:', db.databaseName);

    // Clear existing data
    console.log('Clearing existing data...');
    await db.collection('hotels').deleteMany({});
    await db.collection('places').deleteMany({});

    // Insert new data
    console.log('Inserting hotels...');
    await db.collection('hotels').insertMany(hotels);
    console.log('Inserting places...');
    await db.collection('places').insertMany(places);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedData(); 
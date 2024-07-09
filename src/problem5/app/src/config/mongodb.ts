import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import config from './config';

let databaseInstance: Db | null = null;
let mongoClientInstance: MongoClient | null = null;

export async function connectDB() {
  try {
    console.log(config.MONGODB_URI);
    mongoClientInstance = new MongoClient(config.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await mongoClientInstance.connect();
    databaseInstance = mongoClientInstance.db(config.DATABASE_NAME);

    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

export function getDB(): Db {
  if (!databaseInstance) {
    throw new Error('Database connection not established');
  }
  return databaseInstance;
}

export async function closeDB() {
  if (mongoClientInstance) {
    await mongoClientInstance.close();
    console.log('MongoDB connection closed');
  }
}

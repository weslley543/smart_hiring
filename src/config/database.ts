import mongoose from 'mongoose';
import { logger } from './logger';

export default class MongooseHelper {
  private static instance: MongooseHelper;
  private uri: string | null = null;
  private connection: typeof mongoose | null = null;

  private constructor() {}

  public static getInstance(): MongooseHelper {
    if (!MongooseHelper.instance) {
      MongooseHelper.instance = new MongooseHelper();
    }
    return MongooseHelper.instance;
  }

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    try {
      this.connection = await mongoose.connect(this.uri, {
        serverSelectionTimeoutMS: 5000,
      });
      logger.info('MongoDB connected successfully');
    } catch (error) {
      logger.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
    }
  }
}

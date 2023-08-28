import { MongoClient, Db } from 'mongodb';
import { MONGODB_CONNECTION } from '../constant.js';

export const mongodbProvider = {
  provide: MONGODB_CONNECTION,
  useFactory: async (): Promise<Db> => {
    try {
      const options = {};
      const client = await MongoClient.connect(process.env.DATABASE_URL!, options);
      return client.db(process.env.DATABASE_NAME!);
    } catch (e) {
      throw e;
    }
  },
};

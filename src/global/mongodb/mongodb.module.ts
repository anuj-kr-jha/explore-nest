import { Module } from '@nestjs/common';
import { MONGODB_CONNECTION } from '../constant.js';
import { mongodbProvider } from './mongodb.provider.js';

@Module({
  providers: [mongodbProvider],
  exports: [MONGODB_CONNECTION],
})
export class MongodbModule {}

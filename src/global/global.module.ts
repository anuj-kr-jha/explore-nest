import { Module, Global } from '@nestjs/common';
import { MongodbModule } from './mongodb/mongodb.module.js';

@Global()
@Module({
  imports: [MongodbModule],
  providers: [],
  exports: [MongodbModule],
})
export class GlobalModule {}

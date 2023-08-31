import { Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TasksModule } from './tasks/tasks.module.js';
import { GlobalModule } from './global/global.module.js';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }), // paid service
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      socket: { host: 'localhost', port: 6379 },
      ttl: 10000, // ms
      max: 100, // maximum number of items in cache
    }),
    TasksModule,
    GlobalModule, //
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import type { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TasksModule } from './tasks/tasks.module.js';
import { GlobalModule } from './global/global.module.js';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({ context: 'HTTP' }),
        serializers: {
          req: (req) => ({ method: req.method, url: req.url, params: req.params, body: req.body, query: req.query, ip: req.remoteAddress }),
          res: (res) => ({ statusCode: res.statusCode, body: res.body /*, headers: res.headers, */ }),
        },
        transport: {
          targets: [
            {
              // Log to a file
              target: 'pino/file',
              level: process.env.NODE_ENV !== 'prod' ? 'debug' : 'info',
              options: {
                destination: './logs/app.log',
              },
            },
            {
              // Log to stdout
              target: 'pino-pretty',
              level: process.env.NODE_ENV !== 'prod' ? 'debug' : 'info',
              options: {
                singleLine: true,
                levelFirst: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss.l',
                ignore: 'hostname,req.id,req.params,req.headers,res.headers', // 'req,pid,hostname,context',
                colorize: true,
              },
            },
          ],
        },
      },
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      socket: { host: 'localhost', port: 6379 },
      ttl: 5000, // ms
      max: 100, // maximum number of items in cache
    }),
    TasksModule,
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

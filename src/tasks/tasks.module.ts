import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { tasksController } from './tasks.controller.js';

@Module({
  controllers: [tasksController],
  providers: [TasksService],
})
export class TasksModule {}

import { log } from 'console';
import type { ObjectId } from 'mongodb';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UsePipes, Query, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { FindTaskDto } from './dto/find-task.dto.js';
import { time } from '../global/decorators/decorator.time.js';
import { ValidateObjectIdField } from '../global/decorators/decorator.validateObjectId.js';
import { sealed } from '../global/decorators/decorator.sealed.js';

// @UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // already set in main, so no need to set here
@UseInterceptors(CacheInterceptor)
@Controller({ path: 'tasks' })
// @sealed
export class TasksController {
  readonly #tasksService: TasksService;
  constructor(tasksService: TasksService) {
    this.#tasksService = tasksService;
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.#tasksService.create(createTaskDto);
  }

  @Get()
  @HttpCode(200)
  // @ValidateObjectIdField('_id')
  @time()
  find(@Query() findTaskDto: FindTaskDto) {
    log('query', findTaskDto);
    return this.#tasksService.findAll(findTaskDto);
  }

  @Get('findById/:id')
  @ValidateObjectIdField()
  @time()
  findById(@Param('id') id: ObjectId) {
    return this.#tasksService.findById(id);
  }

  @Patch(':id')
  @ValidateObjectIdField()
  update(@Param('id') id: ObjectId, @Body() updateTaskDto: UpdateTaskDto) {
    return this.#tasksService.update(id, updateTaskDto);
  }

  @Delete('removeById/:id')
  @ValidateObjectIdField()
  removeById(@Param('id') id: ObjectId) {
    return this.#tasksService.removeById(id);
  }
}

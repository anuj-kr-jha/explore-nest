import { log } from 'console';
import type { ObjectId } from 'mongodb';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UsePipes, ValidationPipe, Query, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { FindTaskDto } from './dto/find-task.dto.js';
import { Time } from '../global/decorators/decorator.time.js';
import { ValidateObjectIdField } from '../global/decorators/decorator.validateObjectId.js';

// @UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // already set in main, so no need to set here
@Controller({ path: 'tasks' })
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
  // @Time()
  // @ValidateObjectIdField('_id')
  find(@Query() findTaskDto: FindTaskDto) {
    log('query', findTaskDto);
    return this.#tasksService.findAll(findTaskDto);
  }

  @Get('findById/:id')
  // - @UsePipes(new ValidationPipe({ transform: true, exceptionFactory: () => new NotFoundException('Invalid ID') }))
  @ValidateObjectIdField()
  @Time()
  findById(@Param('id') id: ObjectId) {
    return this.#tasksService.findById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   log('param', id);
  //   log('body', updateTaskDto);
  //   return this.#tasksService.update(id, updateTaskDto);
  // }

  // @Delete('removeById/:id')
  // removeById(@Param('id') id: string) {
  //   return this.#tasksService.removeById(id);
  // }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { FindTaskDto } from './dto/find-task.dto.js';
import { log } from 'console';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller({ path: 'tasks' })
export class tasksController {
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
  find(@Query() findTaskDto: FindTaskDto) {
    log('query', findTaskDto);
    return this.#tasksService.findAll(findTaskDto);
  }

  @Get('findById/:id')
  findById(@Param('id') id: string) {
    return this.#tasksService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    log('param', id);
    log('body', updateTaskDto);
    return this.#tasksService.update(id, updateTaskDto);
  }

  @Delete('removeById/:id')
  removeById(@Param('id') id: string) {
    return this.#tasksService.removeById(id);
  }
}

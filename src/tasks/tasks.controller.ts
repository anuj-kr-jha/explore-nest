import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { FindTaskDto } from './dto/find-task-dto.js';
import { log } from 'console';

@UsePipes(new ValidationPipe({ transform: true }))
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
    const task = this.#tasksService.findAll(findTaskDto);
    return task;
  }

  @Get('findById/:id')
  findOne(@Param('id') id: string) {
    const task = this.#tasksService.findOne(id);
    if (!task) return new NotFoundException({ message: `Task with id: ${id} not found` });
    return task;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.#tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.#tasksService.remove(id);
  }
}

// regexp for alphanumeric string with length 0-10 allow ' ' _ . - in between

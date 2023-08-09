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
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { ITask } from './task.js';

@UsePipes(new ValidationPipe())
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

  @HttpCode(200)
  @Get()
  findAll() {
    return this.#tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.#tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.#tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.#tasksService.remove(+id);
  }
}

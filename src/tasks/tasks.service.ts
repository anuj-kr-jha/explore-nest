import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ITask } from './tasks.interface.js';

@Injectable()
export class TasksService {
  readonly #tasks: ITask[] = [];

  create(task: Omit<ITask, 'id' | 'createdAt'>) {
    this.#tasks.push({ id: uuid(), ...task, createdAt: new Date() });
    return this.#tasks;
  }

  findAll(query: Partial<ITask>) {
    return this.#tasks.filter((task) =>
      Object.entries(query).every(([key, value]: [keyof Partial<ITask>, ITask[keyof Partial<ITask>]]) => {
        if (key === 'createdAt' && task.createdAt && value instanceof Date) return task.createdAt.getTime() === value.getTime();
        return task[key] === value;
      }),
    );
  }

  findById(id: string) {
    const task = this.#tasks.find((task) => task.id === id);
    if (!task) return new NotFoundException({ message: `Task with id: ${id} not found` });
    return task;
  }

  update(id: string, props: Partial<Omit<ITask, 'id' | 'createdAt'>>) {
    const task = this.#tasks.find((task) => task.id === id);
    if (!task) return new NotFoundException({ message: `Task with id: ${id} not found` });
    Object.assign(task, props);
    return task;
  }

  removeById(id: string) {
    const task = this.#tasks.find((task) => task.id === id);
    if (!task) return new NotFoundException({ message: `Task with id: ${id} not found` });
    this.#tasks.splice(this.#tasks.indexOf(task), 1);
    return task;
  }
}

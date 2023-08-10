import { Injectable } from '@nestjs/common';
import { ITask } from './task.d.js';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  readonly #tasks: ITask[] = [];

  create(_task: Omit<ITask, 'id' | 'createdAt'>) {
    const task = { id: uuid(), ..._task, createdAt: new Date() };
    this.#tasks.push(task);
    return this.#tasks;
  }

  findAll(query: Partial<ITask>) {
    return this.#tasks;
  }

  findOne(id: string) {
    return this.#tasks.find((task) => task.id === id);
  }

  update(id: string, props: Partial<Omit<ITask, 'id'>>) {
    const task = this.#tasks.find((task) => task.id === id);
    if (task) Object.assign(task, props);
    return task;
  }

  remove(id: string) {
    const task = this.#tasks.find((task) => task.id === id);
    if (task) this.#tasks.splice(this.#tasks.indexOf(task), 1);
    return task;
  }
}

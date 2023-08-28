import { Db, ObjectId } from 'mongodb';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITask } from './interfaces/tasks.interface.js';
import { MONGODB_CONNECTION } from '../global/constant.js';
@Injectable()
export class TasksService {
  readonly Tasks;

  constructor(@Inject(MONGODB_CONNECTION) db: Db) {
    this.Tasks = db.collection<ITask>('tasks');
  }

  async create(task: Omit<ITask, 'createdAt'>) {
    const result = await this.Tasks.insertOne({ ...task, createdAt: new Date() });
    return result;
  }

  findAll(query: Partial<ITask>) {
    return this.Tasks.find(query).toArray();
  }

  findById(id: ObjectId) {
    const task = this.Tasks.findOne({ _id: id });
    if (!task) return new NotFoundException({ message: `Task with id: ${id} not found` });
    return task;
  }

  // update(id: string, props: Partial<Omit<ITask, 'id' | 'createdAt'>>) {
  //   const task = this.#tasks.find((task) => task.id === id);
  //   if (!task) return new NotFoundException({ message: `Task with id: ${id} not found` });
  //   Object.assign(task, props);
  //   return task;
  // }

  // removeById(id: string) {
  //   const task = this.#tasks.find((task) => task.id === id);
  //   if (!task) return new NotFoundException({ message: `Task with id: ${id} not found` });
  //   this.#tasks.splice(this.#tasks.indexOf(task), 1);
  //   return task;
  // }
}

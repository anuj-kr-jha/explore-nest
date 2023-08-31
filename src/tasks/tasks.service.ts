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

  async findAll(query: Partial<ITask>) {
    return this.Tasks.find(query).toArray();
  }

  async findById(id: ObjectId) {
    const task = this.Tasks.findOne({ _id: id });
    if (!task) return new NotFoundException({ message: `Task with id: ${id} not found` });
    return task;
  }

  async update(id: ObjectId, props: Partial<Omit<ITask, 'id' | 'createdAt'>>) {
    const response = await this.Tasks.findOneAndUpdate({ _id: id }, { $set: props }, { returnDocument: 'after' });
  }

  async removeById(id: ObjectId) {
    const response = await this.Tasks.findOneAndDelete({ _id: id });
    return response?.value;
  }
}

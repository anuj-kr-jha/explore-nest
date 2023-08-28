// - import type { ObjectId } from 'mongodb';
export enum ETaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ITask {
  // -  _id: ObjectId; // handled via WithId<T>
  title: string;
  description: string;
  priority: number;
  status: ETaskStatus;
  createdAt: Date;
}

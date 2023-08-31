import { Task } from './task.model';

export class Project {
  constructor(public title: string, public id: string, public tasks: Task[] = []) {}
}

import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // TASK is our model with array. So our tasks has a array of the type task

    getAllTaks(): Task[] { // result is an array of tasks
        return this.tasks;
    }
}

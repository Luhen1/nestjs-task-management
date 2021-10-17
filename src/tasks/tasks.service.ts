import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'; // v4 version of the uuid 

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // TASK is our model with array. So our tasks has a array of the type task

    getAllTaks(): Task[] { // result is an array of tasks
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task: Task = { 
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };  
        
        this.tasks.push(task); //adding a value to our tasks array with push()
        return task;
    }
}

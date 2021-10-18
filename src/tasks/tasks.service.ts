import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // TASK is our model with array. So our tasks has a array of the type task

    getAllTasks(): Task[] { // result is an array of tasks
        return this.tasks;
    }

    getTaskById(id: string): Task { // result is an array of tasks
        return this.tasks.find((task) => task.id === id);
    }

    deleteTask(id: string): void { // void because i dont want to return anything
        this.tasks = this.tasks.filter((task) => task.id !== id); // tasks has a new array that doesnt have that task. delete this id task and returning the rest
    }

    createTask(createTaskDto: CreateTaskDto): Task{
        const {title, description} = createTaskDto;

        const task: Task = {
                id: uuid(),
                title,
                description,
                status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }   
}

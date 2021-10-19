import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from "./entity/task.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './repository/tasks.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}
    
    getTaskById(id:string): Promise<Task> {
       return this.tasksRepository.getTaskById(id);
    }

    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {    
        return this.tasksRepository.getTasks(filterDto);
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksRepository.createTask(createTaskDto);
    }

     deleteTask(id: string): Promise<void> { // void because i dont want to return anything
        return this.tasksRepository.deleteTask(id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        return this.tasksRepository.updateTaskStatus(id, status);  
    }


    // private tasks: Task[] = []; // TASK is our model with array. So our tasks has a array of the type task

    // getAllTasks(): Task[] { // result is an array of tasks
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     // temporary array
    //     let tasks = this.getAllTasks();

    //     // something with status
    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }
    //     // something with search
    //     if (search) {
    //         tasks = tasks.filter((task) => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             return false;
    //         })
    //     }
    //     //return final result
    //     return tasks;
    // }

    // getTaskById(id: string): Task { // result is an array of tasks

    // // try to get task
    // const found = this.tasks.find((task) => task.id === id);
    
    // // if not found, throw an error (404 not found)
    // //if not found
    // if (!found){
    //     throw new NotFoundException(`Task with ID "${id}" not found`); // you can customize this exception
    // }
    
    // //othervise, return the found task
    //     return found;
    // }

    // deleteTask(id: string): void { // void because i dont want to return anything
    //     const found = this.getTaskById(id); // calls the get task by id function thats already has the error handling exception for us.
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id); // tasks has a new array that doesnt have that task. delete this id task and returning the rest
    // }

    // createTask(createTaskDto: CreateTaskDto): Task{
    //     const {title, description} = createTaskDto;

    //     const task: Task = {
    //             id: uuid(),
    //             title,
    //             description,
    //             status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // } 
    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;   
    // }
}

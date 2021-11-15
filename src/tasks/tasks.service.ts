import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from "./entity/task.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './repository/tasks.repository';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}
    
    getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {    
        return this.tasksRepository.getTasks(filterDto, user);
    }

    async getTaskById(id:string, user: User): Promise<Task> {
       const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

        return found;
    }
    
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        return this.tasksRepository.createTask(createTaskDto, user);    
    }

    // void because i dont want to return anything
    // Delete is 1 call from the database, you get id and delete it. 
    // remove you have to pass parameters so that they can fetch the id first then remove. much longer process and can increase costs for the company
    
    async deleteTask(id: string, user: User): Promise<void> {
        const result = await this.tasksRepository.delete({ id, user });
    
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
      }

    async updateTaskStatus(
        id: string,
        status: TaskStatus,
        user: User,
      ): Promise<Task> {
        const task = await this.getTaskById(id, user);
    
        task.status = status;
        await this.tasksRepository.save(task);
    
        return task;
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

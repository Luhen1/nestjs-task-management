import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTaskFilterDto } from "../dto/get-tasks-filter.dto";
import { Task } from "../entity/task.entity";
import { TaskStatus } from "../task-status.enum";

@EntityRepository(Task) // shows which is entity is being used for our repository
export class TasksRepository extends Repository<Task> {
   
    async getTaskById(id:string): Promise<Task> {
        const found = await this.findOne(id);
        if (!found){
           throw new NotFoundException(`Task with ID "${id}" not found`); // you can customize this exception
         }
         
         return found;
    }
   
    async getTasks(filterDto: GetTaskFilterDto):Promise<Task[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task'); // this query (Consulta) makes a sql that selects task in our database where the full command is "SELECT task FROM TASK"

        if (status) {
            query.andWhere('task.status = :status', {status});
        }
        if (search) {
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', {search: `%${search}%` }, );
        }
        
        const tasks = await query.getMany();
        return tasks 
    }
   
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const {title, description} = createTaskDto;
        
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.save(task);
        return task;
    }


    // Delete is 1 call from the database, you get id and delete it. 
    // remove you have to pass parameters so that they can fetch the id first then remove. much longer process and can increase costs for the company
    async deleteTask(id: string): Promise<void> { 
        const result = await this.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.save(task);

        return task;  
    }
}
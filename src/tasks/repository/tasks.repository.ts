import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTaskFilterDto } from "../dto/get-tasks-filter.dto";
import { Task } from "../entity/task.entity";
import { TaskStatus } from "../task-status.enum";

@EntityRepository(Task) // shows which is entity is being used for our repository
export class TasksRepository extends Repository<Task> {
   
   
    async getTasks(filterDto: GetTaskFilterDto, user: User):Promise<Task[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task'); // this query (Consulta) makes a sql that selects task in our database where the full command is "SELECT task FROM TASK"

        query.where({ user });

        if (status) {
            query.andWhere('task.status = :status', {status});
        }
        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', 
                {search: `%${search}%` }, 
            );
        }
        
        const tasks = await query.getMany();
        return tasks 
    }
   
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        const {title, description} = createTaskDto;
        
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user, // here you are making sure that the task created is from that user. making the user own that task 
        });

        await this.save(task);
        return task;
    }
}
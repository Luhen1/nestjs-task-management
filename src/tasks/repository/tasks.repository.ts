import { EntityRepository, Repository } from "typeorm";
import { Task } from "../entity/task.entity";

@EntityRepository(Task) // shows which is entity is being used for our repository
export class TasksRepository extends Repository<Task> {
        
}
import { Exclude } from "class-transformer";
import { User } from "src/auth/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../task-status.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title:string;
    
    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    //many tasks to one user
    @ManyToOne((_type) => User, (user) => user.tasks, {eager: false})
    @Exclude({toPlainOnly: true }) //whenever i want to convert to json when creating task. Do not show user info. excluding object property
    user: User;
}
// eager, false -> when you retrieve a task in the database, dont fetch user also that is related with the task.

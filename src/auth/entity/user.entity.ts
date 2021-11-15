import { Task } from 'src/tasks/entity/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;

  // user can have many tasks
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}

// eager, true -> when you retrieve a user in the database, fetch tasks also that is related with user.

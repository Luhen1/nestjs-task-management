import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './entity/task.entity';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { ConfigService } from '@nestjs/config';

//Using guard at controller level. not in each specific tasks

//when using config management. you can define env via terminal using TEST_VALUE=blablala yarn start:dev
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    // if you need config service. type
    private configService: ConfigService,
    private tasksService: TasksService,
    ) {
      // heres show you provide value when you start application. 
      //configService.get('TEST_VALUE')  // this test value is defined in our env.stage.dev
    }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Get()
  getTasks(
    @Query() fillterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(fillterDto, user);
  }

  @Post()
  createTask(
    @Body() CreateTaskDto: CreateTaskDto,
    @GetUser() user: User, // when creating task, fetch user
  ): Promise<Task> {
    return this.tasksService.createTask(CreateTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = UpdateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  // @Get()
  // getTasks(@Query() fillterDto: GetTaskFilterDto): Task[] {
  //   // if any filter is actived, call getTaskWillFilter
  //   //else get all tasks
  //   if(Object.keys(fillterDto).length){ // if any of the optinal keys was actived. run this function
  //     return this.tasksService.getTasksWithFilters(fillterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }

  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {

  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(CreateTaskDto);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = UpdateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}

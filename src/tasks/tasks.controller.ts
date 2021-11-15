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

//Using guard at controller level. not in each specific tasks
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
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
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = UpdateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
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

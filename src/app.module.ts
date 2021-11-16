import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    // if you need config module. use this
    // ConfigModule.forRoot({
  //   envFilePath: [`.env.stage.${process.env.STAGE}`]
  // }),
  TasksModule,
  TypeOrmModule.forRoot({
    type:'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'task-management',
    autoLoadEntities: true,
    synchronize: true,
  }),
  AuthModule,
],
})
export class AppModule {}

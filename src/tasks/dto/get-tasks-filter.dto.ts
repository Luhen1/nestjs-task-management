import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTaskFilterDto {
    // this is my enum data type
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus; // ? sign to show that its optinal to be used
    // this is my string data type
    @IsOptional()
    @IsString()
    search?: string;
}
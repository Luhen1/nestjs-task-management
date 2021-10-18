import { TaskStatus } from "../task.model";

export class GetTaskFilterDto {
    status?: TaskStatus; // ? sign to show that its optinal to be used
    search?: string;
}
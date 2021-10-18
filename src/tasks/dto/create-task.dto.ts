import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    //defines class with variable: data_type 
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description:string;
}
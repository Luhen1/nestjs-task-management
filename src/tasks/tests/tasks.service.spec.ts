import { Test } from '@nestjs/testing';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TasksRepository } from '../repository/tasks.repository';
import { TasksService } from '../tasks.service';

//UNIT TESTINNG = TESTING IN ISOLATION

const mockTaskRepository = () => ({
    getTasks: jest.fn(), //mock functions
});

const mockUser = {
    username: "lucas",
    id: "someid",
    password: "somepassword",
    tasks: [],
}

describe('TaskService', () => {
    let tasksService: TasksService;
    let tasksRepository: TasksRepository;

    //dummy module that contains my task service in the task repository

    // beforeEach is making sure that before every test. load this
    beforeEach(async () => {
        // initialize a nestjs task service and repository. --> dummy, not the real One
        // we are not initializing module typeorm because we dont want to interact with the real database also
        //mocking is to copy. making a object with bunch of methods and a prop. 

        //since the task service is dependent with task repository. we are to mock the task repository with a function

        const module = await Test.createTestingModule({
            providers: [TasksService, { provide: TasksRepository, useFactory: mockTaskRepository }],
        }).compile(); // calling this function is not enough. we need to compile module

        // assigning the real task service to the let variable
        tasksService =  module.get(TasksService);
        tasksRepository = module.get(TasksRepository);
    });

    //unit testing
    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and returns the result', async () => {

            // TIP -> Remove any unnecessary functions to reduce redundancies
            //Here we are testing that tasksRepository.gettasks is being called.
            //Expect that the tasksrepository is not called
            //expect(tasksRepository.getTasks).not.toHaveBeenCalled();
            // using the mocked tasksRepository
            // mockResolvedValue --> returns results according with a promise value. in this case, our task service as a promise<Task[]>
            // there is a diverse ways to return values Link[1]
            tasksRepository.getTasks.mockResolvedValue('someValue');
            //now we are expecting that tasks repository is being called
            const result = await tasksService.getTasks(null, mockUser);
            // this part makes sure that the function is being called. 
            //expect(tasksRepository.getTasks).toHaveBeenCalled();
            // here we are expecting a return of the result 
            expect(result).toEqual('someValue');
        });
    });
});

//Links [1] - >  https://archive.jestjs.io/docs/en/22.x/mock-function-api#mockfnmockreturnvaluevalue
//Links [2] - > https://www.youtube.com/watch?v=Jv2uxzhPFl4 -TDD shows that testing before coding is the best way to improve your productivity

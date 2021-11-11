import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}

    async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(AuthCredentialsDto);
    }
}

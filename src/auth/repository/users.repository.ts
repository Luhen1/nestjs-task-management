import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = AuthCredentialsDto;

        const user = this.create({
            username,
            password
        });
        
        try {
            await this.save(user);
        } catch (error) {
        if (error.code === '23505') { //username duplicates
            throw new ConflictException('Username already exists')
        }  else {
            throw new InternalServerErrorException();
            }
        }
    }
}
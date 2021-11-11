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

        await this.save(user);
    }
}
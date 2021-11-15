// this is just a injectable class
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./repository/users.repository";
import { JwtPayload } from './jwt-payload.interface';
import { User } from './entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor (
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {
        super({ //calls the father object or constructor
            secretOrKey: 'topsecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        }); 
    }

    async validate(payload: JwtPayload): Promise<User> { // promise because this is a async function 
        const {username} = payload;
        const user: User = await this.usersRepository.findOne({ username});
        
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
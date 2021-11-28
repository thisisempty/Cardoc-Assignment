import { Repository }           from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy }                  from "@nestjs/passport";
import { InjectRepository }                  from "@nestjs/typeorm";
import { User }                              from "./entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            secretOrKey    : process.env.SECRET_KEY,
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { id }     = payload;
        const user: User = await this.userRepository.findOne({id});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
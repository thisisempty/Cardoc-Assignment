import { Repository }           from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy }                  from "@nestjs/passport";
import { InjectRepository }                  from "@nestjs/typeorm";
import { User }                              from "./entity/user.entity";
import { ConfigService }                     from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('SECRET_KEY'),
        })
    }

    async validate(payload) {
        const { userId }     = payload;
        const user: User = await this.userRepository.findOne({userId});

        if(!user) {
            throw new BadRequestException("DOES_NOT_EXIST");
        }

        return user;
    }
}
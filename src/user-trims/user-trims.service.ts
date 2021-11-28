import { Repository } from 'typeorm';

import { BadRequestException, 
         Injectable, 
         InternalServerErrorException } from '@nestjs/common';
import { InjectRepository }             from '@nestjs/typeorm';
import { AuthService }                  from 'src/auth/auth.service';

import { CreateUserTrimDto } from './dto/create-user-trim.dto';
import { UserTrim }          from './entity/user-trim.entity';

@Injectable()
export class UserTrimsService {
    constructor(
        @InjectRepository(UserTrim) private userTrimRepository: Repository<UserTrim>,
        private authServive: AuthService
    ){}

    async create(
        createUserTrimDto: CreateUserTrimDto,
        userId: string
    ): Promise<UserTrim>{
        const user = await this.authServive.getUserById(userId);

        if (!user) {
            throw new BadRequestException("DOES_NOT_EXIST");
        }

        try {
            const userTrim = this.userTrimRepository.create({
                trimId: createUserTrimDto.trimId,
                user
            })

            return await this.userTrimRepository.save(userTrim);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}

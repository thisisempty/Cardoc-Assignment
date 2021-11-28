import * as bcrypt    from 'bcrypt';
import { Repository } from 'typeorm';

import { BadRequestException, 
         Injectable, 
         InternalServerErrorException } from '@nestjs/common';
import { InjectRepository }             from '@nestjs/typeorm';
import { JwtService }                   from '@nestjs/jwt';

import { SignInDto }         from './dto/signin.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User }              from './entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private jwtService     : JwtService
    ) {}
    
    async signUp(authCredentialDto: AuthCredentialDto): Promise<{statusCode: number, message: string}> {
        const { id, password } = authCredentialDto;
        
        await this.isExistUser(authCredentialDto.id);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.userRepository.create({
            userId: id,
            password: hashedPassword
        })

        try{
            await this.userRepository.save(user)
            return {"statusCode" : 200, "message" : "SUCCESS"}
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async signIn(signInDto: SignInDto): Promise<{access_token}> {
        const { id, password } = signInDto;

        const user = await this.userRepository.findOne(signInDto.id);

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload      = { id };
            const access_token = await this.jwtService.sign(payload)

            return { access_token }
        } else {
            throw new BadRequestException("INVALID_ACCESS")
        }  
    } 

    async getUserById(userId: string): Promise<User> {
        return await this.userRepository.findOne({userId:userId})
    }

    private async isExistUser(id: string): Promise<void> {
        const user = await this.getUserById(id);

        if(user) {
            throw new BadRequestException("ALREADY_EXIST")
        }
    }
}


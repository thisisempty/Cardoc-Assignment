import { Module }                      from '@nestjs/common';
import { TypeOrmModule }               from '@nestjs/typeorm';
import { PassportModule }              from '@nestjs/passport';
import { JwtModule }                   from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService }    from './auth.service';
import { AuthController } from './auth.controller';
import { User }           from './entity/user.entity';
import { JwtStrategy }    from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy : 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('SECRET_KEY'),
                signOptions: {
                    expiresIn: configService.get('JWT_EXPIRATION')
                }
            }),
        }),
        TypeOrmModule.forFeature([User])],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule, AuthService]
})
export class AuthModule {}

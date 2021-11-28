import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserTrimsService }    from './user-trims.service';
import { UserTrimsController } from './user-trims.controller';
import { UserTrim }            from './entity/user-trim.entity';
import { AuthModule }          from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTrim]),
        AuthModule
    ],
    providers: [UserTrimsService],
    controllers: [UserTrimsController]
})
export class UserTrimsModule {}

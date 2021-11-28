import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule }      from '@nestjs/typeorm';

import { TiresService }    from './tires.service';
import { TiresController } from './tires.controller';
import { Tire }            from './entity/tire.entity';
import { AuthModule }      from 'src/auth/auth.module';
import { UserTrimsModule } from 'src/user-trims/user-trims.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tire]),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5
        }),
        AuthModule,
        UserTrimsModule
    ],
    providers: [TiresService],
    controllers: [TiresController]
})
export class TiresModule {}

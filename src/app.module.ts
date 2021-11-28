import { Module }        from '@nestjs/common';
import { ConfigModule }  from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule }      from './auth/auth.module';
import { TiresModule }     from './tires/tires.module';
import { UserTrimsModule } from './user-trims/user-trims.module';


@Module({
  imports: [
        ConfigModule.forRoot({
            envFilePath      : '.env',
            isGlobal         : true,
        }),
        TypeOrmModule.forRoot({
            type        : 'sqlite',
            database    : 'cardoc.db',
            entities    : ["dist/**/*.entity{.ts,.js}"],
            synchronize : true,
            logging: true
        }),
        AuthModule, 
        TiresModule, 
        UserTrimsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UserTrimsService } from './user-trims.service';
import { UserTrimsController } from './user-trims.controller';

@Module({
  providers: [UserTrimsService],
  controllers: [UserTrimsController]
})
export class UserTrimsModule {}

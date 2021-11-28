import { Module } from '@nestjs/common';
import { TiresService } from './tires.service';
import { TiresController } from './tires.controller';

@Module({
  providers: [TiresService],
  controllers: [TiresController]
})
export class TiresModule {}

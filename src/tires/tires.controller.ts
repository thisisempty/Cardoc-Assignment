import { BadRequestException, 
         Body, 
         Controller, 
         Get, 
         Param, 
         Post} from '@nestjs/common';

import { CreateUserTireDto } from './dto/create-user-tire.dto';
import { TiresService }      from './tires.service';

@Controller('tires')
export class TiresController {
    constructor(
        private readonly tireService: TiresService
    ){}
    
    @Post('/register')
    async create(@Body() body) : Promise<void> {
        if (body.length === 0 || body.length > 5) {
            throw new BadRequestException("EXCEED_OR_NO_INPUT_VALUE")
        }
        for(const info of body) {
            let createUserTireDto = new CreateUserTireDto();
            createUserTireDto = {...info}
            await this.tireService.create(createUserTireDto);
        }
    }

    @Get('/:userId')
    async getUserTireInfo(@Param('userId') userId: string): Promise<{}> {
        return this.tireService.getUserTireInfo(userId);
    }
}

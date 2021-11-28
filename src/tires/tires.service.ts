import { Repository } from 'typeorm';

import { HttpService, 
         Injectable, 
         InternalServerErrorException } from '@nestjs/common';
import { InjectRepository }             from '@nestjs/typeorm';

import { CreateUserTrimDto } from 'src/user-trims/dto/create-user-trim.dto';
import { UserTrimsService }  from 'src/user-trims/user-trims.service';
import { CreateTireDto }     from './dto/create-tire.dto';
import { CreateUserTireDto } from './dto/create-user-tire.dto';
import { Tire }              from './entity/tire.entity';

@Injectable()
export class TiresService {
    constructor(
        @InjectRepository(Tire) private tireRepository: Repository<Tire>,
        private httpService: HttpService,
        private userTrimService: UserTrimsService,
    ){}

    async create(
        createUserTireDto: CreateUserTireDto
    ): Promise<{statusCode: number, message: string}> {
        const tireInfo = await this.getTrimsTiresInfo(createUserTireDto.trimId)

        try {
            await this.saveTire(tireInfo, createUserTireDto.trimId, createUserTireDto.userId);

            return {statusCode: 200, message:"SUCCESS"}
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    private async getTrimsTiresInfo(trimId: number): Promise<any> {
        const url = 'https://dev.mycar.cardoc.co.kr/v1/trim/' + trimId
        const observer = await this.httpService.get(url).toPromise();

        let frontTire = observer.data.spec.driving.frontTire.value.replace(" ", "");
        let rearTire  = observer.data.spec.driving.rearTire.value.replace(" ", "");

        return { frontTire, rearTire }
    }

    async saveTire(createTireDto: CreateTireDto, 
                     trimId: number, 
                     userId: string): Promise<Tire> {
        
        const createUserTrimDto = new CreateUserTrimDto();
        createUserTrimDto.trimId = trimId;

        const userTrim = await this.userTrimService.create(createUserTrimDto, userId);

        const [frontWidth, frontAspectRatio, frontWheelSize] = createTireDto.frontTire.split(/[\/R]/g);
        const [rearWidth, rearAspectRatio, rearWheelSize]    = createTireDto.rearTire.split(/[\/R]/g);

        const tire = new Tire();

        tire.userTrim         = userTrim;
        tire.frontWidth       = Number(frontWidth);
        tire.frontAspectRatio = Number(frontAspectRatio);
        tire.frontWheelSize   = Number(frontWheelSize);
        tire.rearWidth        = Number(rearWidth);
        tire.rearAspectRatio  = Number(rearAspectRatio);
        tire.rearWheelSize    = Number(rearWheelSize);

        return await this.tireRepository.save(tire); 

    }

    async getUserTireInfo(userId: string):Promise<{}> {
        const userTireList = await this.tireRepository.createQueryBuilder('tire')
                                                      .innerJoin('tire.userTrim', 'user-trims')
                                                      .innerJoin('user-trims.user', 'user')
                                                      .where('user.userId=:userId', {userId})
                                                      .getMany();

        return userTireList                              
    }
}

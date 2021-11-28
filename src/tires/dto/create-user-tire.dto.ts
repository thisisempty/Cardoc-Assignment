import { IsNumber, IsString } from "class-validator";

export class CreateUserTireDto {
    @IsString()
    userId: string;

    @IsNumber()
    trimId: number;
}
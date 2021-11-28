import { IsNumber } from "class-validator";

export class CreateUserTrimDto {
    @IsNumber()
    trimId: number;
}
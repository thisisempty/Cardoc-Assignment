import { IsString, Matches } from "class-validator";

export class CreateTireDto {
    @Matches(/^[0-9]{3}\/[0-9]{2}R[0-9]{2}/g)
    @IsString()
    frontTire: string;

    @Matches(/^[0-9]{3}\/[0-9]{2}R[0-9]{2}/g)
    @IsString()
    rearTire: string;
}
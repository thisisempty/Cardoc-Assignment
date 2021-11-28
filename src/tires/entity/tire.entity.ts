import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/common/base-entity";


@Entity({ name : 'tires' })
export class Tire extends BaseEntity{
    @Column()
    frontWidth: number;

    @Column()
    frontAspectRatio: number;

    @Column()
    frontWheelSize: number;

    @Column()
    rearWidth: number;

    @Column()
    rearAspectRatio: number;

    @Column()
    rearWheelSize: number;
}
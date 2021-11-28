import { Column, Entity, OneToOne } from "typeorm";

import { BaseEntity } from "src/common/base-entity";
import { UserTrim } from "src/user-trims/entity/user-trim.entity";


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

    @OneToOne(() => UserTrim)
    public userTrim: UserTrim;
}
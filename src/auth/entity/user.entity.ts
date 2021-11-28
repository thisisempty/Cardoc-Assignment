import { Column, Entity, OneToMany, Unique } from "typeorm";

import { BaseEntity } from "src/common/base-entity";
import { UserTrim }   from "src/user-trims/entity/user-trim.entity";


@Entity({name: 'users'})
@Unique(['id'])
export class User extends BaseEntity {
    @Column()
    userId: string;

    @Column()
    password: string;

    @OneToMany(() => UserTrim, user_trims => user_trims.user)
    public user_trims !: UserTrim[];
}
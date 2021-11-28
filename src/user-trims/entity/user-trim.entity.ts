import { Column, Entity, ManyToOne } from "typeorm";

import { User }       from "src/auth/entity/user.entity";
import { BaseEntity } from "src/common/base-entity";

@Entity({ name: 'user_trims' })
export class UserTrim extends BaseEntity{
    @Column()
    trimId: number;

    @ManyToOne(() => User, (user) => user.user_trims, { eager: false })
    user: User;
}
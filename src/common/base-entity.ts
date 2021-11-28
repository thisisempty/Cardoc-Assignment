import { CreateDateColumn, 
         PrimaryGeneratedColumn, 
         UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: bigint;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
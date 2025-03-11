import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ type: 'varchar', length: 30 })
    title: string;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ type: 'varchar', length: 50 })
    time: Date;
}



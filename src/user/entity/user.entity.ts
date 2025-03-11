import { Blog } from 'src/blog/entities/blog.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 20 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @OneToMany(type => Blog, blog => blog.user_id)
  blog: Blog[]
}



import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  passwordHash: string;
}

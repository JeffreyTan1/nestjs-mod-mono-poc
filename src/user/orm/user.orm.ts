import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  passwordHash: string;
}

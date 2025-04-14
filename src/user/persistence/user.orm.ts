import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;
}

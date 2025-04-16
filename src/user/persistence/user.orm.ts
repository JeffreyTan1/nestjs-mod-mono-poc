import { Column, Entity } from 'typeorm';
import { BaseAggregateOrm } from '@/common/database/base-aggregate.orm';

@Entity('user')
export class UserOrm extends BaseAggregateOrm {
  @Column()
  email: string;
}

import { BaseEntityOrm } from '@/common/database/base-entity.orm';
import { Column, Entity } from 'typeorm';

@Entity('activity')
export class ActivityOrm extends BaseEntityOrm {
  @Column()
  operation: string;

  @Column('uuid')
  userId: string;

  @Column()
  timestamp: Date;

  @Column()
  reason: string | null;
}

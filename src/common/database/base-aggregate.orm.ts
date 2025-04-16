import { PrimaryColumn, Column } from 'typeorm';

export abstract class BaseAggregateOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

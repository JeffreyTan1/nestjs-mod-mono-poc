import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseAggregateOrm {
  @PrimaryColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

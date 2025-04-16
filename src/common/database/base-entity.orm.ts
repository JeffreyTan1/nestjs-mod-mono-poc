import { PrimaryColumn } from 'typeorm';

export class BaseEntityOrm {
  @PrimaryColumn('uuid')
  id: string;
}

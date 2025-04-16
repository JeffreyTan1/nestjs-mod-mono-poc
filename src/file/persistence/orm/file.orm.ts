import { BaseEntityOrm } from '@/common/database/base-entity.orm';
import { Column, Entity } from 'typeorm';

@Entity('file')
export class FileOrm extends BaseEntityOrm {
  @Column()
  name: string;

  @Column()
  fileType: string;

  @Column()
  softDeleted: boolean;
}

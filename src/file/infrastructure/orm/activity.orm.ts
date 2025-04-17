import { BaseEntityOrm } from '@common/database/base-entity.orm';
import { Column, Entity, ManyToOne } from 'typeorm';
import { FileOrm } from './file.orm';
import { VersionOrm } from './version.orm';

@Entity('activity')
export class ActivityOrm extends BaseEntityOrm {
  @Column()
  operation: string;

  @Column('uuid')
  userId: string;

  @Column()
  timestamp: Date;

  @Column('varchar', { nullable: true })
  reason: string | null;

  @ManyToOne(() => FileOrm, (file) => file.history, { onDelete: 'CASCADE' })
  file: FileOrm;

  @ManyToOne(() => VersionOrm, (version) => version.activityAsFrom, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  fromVersion: VersionOrm | null;

  @ManyToOne(() => VersionOrm, (version) => version.activityAsTo, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  toVersion: VersionOrm | null;
}

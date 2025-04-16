import { BaseEntityOrm } from '@/common/database/base-entity.orm';
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

  @Column({ nullable: true })
  reason: string | null;

  @ManyToOne(() => FileOrm, (file) => file.history)
  file: FileOrm;

  @ManyToOne(() => VersionOrm, (version) => version.activityAsFrom, {
    nullable: true,
  })
  fromVersion: VersionOrm | null;

  @ManyToOne(() => VersionOrm, (version) => version.activityAsTo, {
    nullable: true,
  })
  toVersion: VersionOrm | null;
}

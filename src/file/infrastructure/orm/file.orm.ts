import { BaseAggregateOrm } from '@common/database/base-aggregate.orm';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { VersionOrm } from './version.orm';
import { ActivityOrm } from './activity.orm';

@Entity('file')
export class FileOrm extends BaseAggregateOrm {
  @Column()
  name: string;

  @Column()
  fileType: string;

  @Column({ default: false })
  softDeleted: boolean;

  @OneToOne(() => VersionOrm, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  currentVersion: VersionOrm | null;

  @OneToMany(() => VersionOrm, (version) => version.file, { cascade: true })
  versions: VersionOrm[];

  @OneToMany(() => ActivityOrm, (activity) => activity.file, { cascade: true })
  history: ActivityOrm[];
}

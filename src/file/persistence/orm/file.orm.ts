import { BaseAggregateOrm } from '@common/database/base-aggregate.orm';
import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
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

  @OneToOne(() => VersionOrm, { nullable: true })
  @JoinColumn()
  currentVersion: VersionOrm | null;

  @OneToMany(() => VersionOrm, (version) => version.file)
  versions: VersionOrm[];

  @OneToMany(() => ActivityOrm, (activity) => activity.file)
  history: ActivityOrm[];
}

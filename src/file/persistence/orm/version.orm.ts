import { BaseEntityOrm } from '@common/database/base-entity.orm';
import { MetadataProps } from '../../domain/metadata.vo';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { FileOrm } from './file.orm';
import { ActivityOrm } from './activity.orm';

@Entity('version')
export class VersionOrm extends BaseEntityOrm {
  @Column()
  versionNumber: number;

  @Column()
  mimeType: string;

  @Column()
  storageStrategy: string;

  @Column()
  storageIdentifier: string;

  @Column('jsonb', { nullable: true })
  metadata: MetadataProps | null;

  @ManyToOne(() => FileOrm, (file) => file.versions)
  file: FileOrm;

  @OneToMany(() => ActivityOrm, (activity) => activity.fromVersion)
  activityAsFrom: ActivityOrm[];

  @OneToMany(() => ActivityOrm, (activity) => activity.toVersion)
  activityAsTo: ActivityOrm[];
}

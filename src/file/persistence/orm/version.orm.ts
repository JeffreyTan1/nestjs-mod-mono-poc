import { BaseEntityOrm } from '@/common/database/base-entity.orm';
import { MetadataProps } from '@/file/domain/metadata.vo';
import { Column, Entity } from 'typeorm';

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

  @Column('jsonb')
  metadata: MetadataProps | null;
}

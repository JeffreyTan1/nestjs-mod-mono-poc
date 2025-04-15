import { BaseEntity } from '@/common/domain/base.entity';
import { Metadata } from './metadata.vo';
import { IStorageStrategy } from './storage-strategy.interface';

export class Version extends BaseEntity {
  private readonly versionNumber: number;
  private readonly mimeType: string;
  private readonly metadata: Metadata;
  private readonly storage: IStorageStrategy;

  constructor(
    versionNumber: number,
    mimeType: string,
    metadata: Metadata,
    id?: string,
  ) {
    super(id);
    this.versionNumber = versionNumber;
  }

  public getVersionNumber(): number {
    return this.versionNumber;
  }

  public getMimeType(): string {
    return this.mimeType;
  }

  public getMetadata(): Metadata {
    return this.metadata;
  }
}

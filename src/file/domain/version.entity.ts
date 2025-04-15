import { BaseEntity } from '@/common/domain/base.entity';
import { Metadata } from './metadata.vo';
import { IStorageStrategy } from './storage/storage-strategy.interface';

export class Version extends BaseEntity {
  private readonly versionNumber: number;
  private readonly mimeType: string;
  private readonly metadata: Metadata;
  private readonly storageStrategy: IStorageStrategy;

  constructor(
    versionNumber: number,
    mimeType: string,
    metadata: Metadata,
    storageStrategy: IStorageStrategy,
    id?: string,
  ) {
    super(id);
    this.versionNumber = versionNumber;
    this.mimeType = mimeType;
    this.metadata = metadata;
    this.storageStrategy = storageStrategy;
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

  public getStorageStrategy(): IStorageStrategy {
    return this.storageStrategy;
  }
}

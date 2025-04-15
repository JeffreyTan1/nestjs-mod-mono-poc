import { BaseEntity } from '@/common/domain/base.entity';
import { Metadata } from './metadata.vo';
import { StorageStrategyType } from './storage/storage-strategy-type.enum';

export class Version extends BaseEntity {
  private readonly versionNumber: number;
  private readonly mimeType: string;
  private readonly storageStrategy: StorageStrategyType;
  private readonly storageIdentifier: string;
  private readonly metadata: Metadata | null;

  constructor(
    versionNumber: number,
    mimeType: string,
    storageStrategy: StorageStrategyType,
    storageIdentifier: string,
    metadata: Metadata | null,
    id?: string,
  ) {
    super(id);
    this.versionNumber = versionNumber;
    this.mimeType = mimeType;
    this.storageStrategy = storageStrategy;
    this.storageIdentifier = storageIdentifier;
    this.metadata = metadata;
  }

  public getVersionNumber(): number {
    return this.versionNumber;
  }

  public getMimeType(): string {
    return this.mimeType;
  }

  public getMetadata(): Metadata | null {
    return this.metadata;
  }

  public getStorageStrategy(): StorageStrategyType {
    return this.storageStrategy;
  }

  public getStorageIdentifier(): string {
    return this.storageIdentifier;
  }
}

import { BaseEntity } from '@/common/domain/base.entity';
import { Metadata } from './metadata.vo';
import { StorageStrategy } from './storage/storage-strategy.enum';

export class Version extends BaseEntity {
  private readonly versionNumber: number;
  private readonly mimeType: string;
  private readonly storageStrategy: StorageStrategy;
  private readonly storageIdentifier: string;
  private readonly metadata: Metadata | null;

  constructor(
    versionNumber: number,
    mimeType: string,
    storageStrategy: StorageStrategy,
    storageIdentifier: string,
    metadata?: Metadata,
    id?: string,
  ) {
    super(id);
    this.versionNumber = versionNumber;
    this.mimeType = mimeType;
    this.storageStrategy = storageStrategy;
    this.storageIdentifier = storageIdentifier;
    this.metadata = metadata ?? null;
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

  public getStorageStrategy(): StorageStrategy {
    return this.storageStrategy;
  }

  public getStorageIdentifier(): string {
    return this.storageIdentifier;
  }
}

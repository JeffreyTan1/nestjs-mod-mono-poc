import { BaseEntity } from '@/common/domain/base.entity';
import { Metadata } from './metadata.vo';

export class Version extends BaseEntity {
  private readonly versionNumber: number;
  private readonly mimeType: string;
  private readonly metadata: Metadata;
  private readonly storageStrategyName: string;
  private readonly storageIdentifier: string;

  constructor(
    versionNumber: number,
    mimeType: string,
    metadata: Metadata,
    storageStrategyName: string,
    storageIdentifier: string,
    id?: string,
  ) {
    super(id);
    this.versionNumber = versionNumber;
    this.mimeType = mimeType;
    this.metadata = metadata;
    this.storageStrategyName = storageStrategyName;
    this.storageIdentifier = storageIdentifier;
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

  public getStorageStrategyName(): string {
    return this.storageStrategyName;
  }

  public getStorageIdentifier(): string {
    return this.storageIdentifier;
  }
}

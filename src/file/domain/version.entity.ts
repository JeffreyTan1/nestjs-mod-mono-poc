import { BaseEntity } from '@/common/domain/base.entity';
import { Metadata } from './metadata.vo';

export class Version extends BaseEntity {
  private readonly versionNumber: number;
  private readonly mimeType: string;
  private readonly storageStrategyName: string;
  private readonly storageIdentifier: string;
  private readonly metadata: Metadata | null;

  constructor(
    versionNumber: number,
    mimeType: string,
    storageStrategyName: string,
    storageIdentifier: string,
    metadata?: Metadata,
    id?: string,
  ) {
    super(id);
    this.versionNumber = versionNumber;
    this.mimeType = mimeType;
    this.storageStrategyName = storageStrategyName;
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

  public getStorageStrategyName(): string {
    return this.storageStrategyName;
  }

  public getStorageIdentifier(): string {
    return this.storageIdentifier;
  }
}

import { BaseAggregate } from '@/common/domain/base.aggregate';
import { Version } from './version.entity';
import { Activity } from './activity/activity.entity';
import { IStorageStrategy } from './storage/storage-strategy.interface';
import { Metadata } from './metadata.vo';
import { Operation } from './activity/operation.enum';

export class File extends BaseAggregate {
  private readonly name: string;
  private currentVersion: Version | null;
  private versions: Version[];
  private history: Activity[];
  private softDeleted: boolean;

  constructor(
    name: string,
    currentVersion: Version | null,
    versions: Version[],
    history: Activity[],
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    softDeleted?: boolean,
  ) {
    super(id, createdAt, updatedAt);
    this.name = name;
    this.currentVersion = currentVersion;
    this.versions = versions;
    this.history = history;
    this.softDeleted = softDeleted ?? false;
  }

  public async addNewVersion(
    content: Buffer,
    userId: string,
    metadata: Metadata,
    storageStrategy: IStorageStrategy,
  ) {
    const versionNumber = this.getNextVersionNumber();

    const storageIdentifier = await storageStrategy.storeAndReturnIdentifier(
      this.id,
      versionNumber,
      content,
    );

    // TODO: get mime type from content, store in the storage strategy
    const version = new Version(
      versionNumber,
      'TODO: mimetype',
      metadata,
      storageStrategy.getName(),
      storageIdentifier,
    );

    const activity = new Activity(
      Operation.NEW_VERSION,
      this.currentVersion,
      version,
      userId,
      new Date(),
    );

    this.versions.push(version);
    this.currentVersion = version;
    this.history.push(activity);
  }

  public restoreVersion(
    version: Version,
    userId: string,
    reason?: string,
  ): void {
    this.currentVersion = version;

    const activity = new Activity(
      Operation.RESTORE_VERSION,
      this.currentVersion,
      version,
      userId,
      new Date(),
      reason,
    );

    this.history.push(activity);
  }

  public softDelete(userId: string, reason?: string): void {
    this.softDeleted = true;

    const activity = new Activity(
      Operation.SOFT_DELETE,
      this.currentVersion,
      null,
      userId,
      new Date(),
      reason,
    );

    this.history.push(activity);
  }

  // Getters
  public getName(): string {
    return this.name;
  }

  public getCurrentVersion(): Version | null {
    return this.currentVersion;
  }

  public getVersions(): Version[] {
    return this.versions;
  }

  public getHistory(): Activity[] {
    return this.history;
  }

  public getSoftDeleted(): boolean {
    return this.softDeleted;
  }

  private getNextVersionNumber(): number {
    return this.versions.length + 1;
  }
}

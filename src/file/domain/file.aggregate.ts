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
  private activityHistory: Activity[];

  constructor(
    name: string,
    currentVersion: Version | null,
    versions: Version[],
    activityHistory: Activity[],
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.name = name;
    this.currentVersion = currentVersion;
    this.versions = versions;
    this.activityHistory = activityHistory;
  }

  public addNewVersion(
    content: Buffer,
    userId: string,
    reason: string,
    metadata: Metadata,
    storageStrategy: IStorageStrategy,
  ) {
    const versionNumber = this.getNextVersionNumber();
    const version = new Version(
      versionNumber,
      'TODO: mimetype',
      metadata,
      storageStrategy,
    );
    this.versions.push(version);
    this.activityHistory.push(
      new Activity(
        reason,
        Operation.CREATE,
        this.currentVersion,
        version,
        userId,
        new Date(),
      ),
    );
    this.currentVersion = version;
  }

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
    return this.activityHistory;
  }

  public delete(): void {
    throw new Error('Not implemented');
  }

  private getNextVersionNumber(): number {
    return this.versions.length + 1;
  }
}

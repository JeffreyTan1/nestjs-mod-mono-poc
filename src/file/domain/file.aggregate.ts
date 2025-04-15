import { BaseAggregate } from '@/common/domain/base.aggregate';
import { Version } from './version.entity';
import { Activity } from './activity/activity.entity';
import { Metadata } from './metadata.vo';
import { Operation } from './activity/operation.enum';
import { FileType } from './file-type.enum';
import { StorageStrategyType } from './storage/storage-strategy-type.enum';
import { IStorageStrategy } from './storage/storage-strategy.interface';

export class File extends BaseAggregate {
  private readonly name: string;
  private readonly fileType: FileType;
  private currentVersion: Version | null;
  private versions: Version[];
  private history: Activity[];
  private softDeleted: boolean;

  constructor(
    name: string,
    fileType: FileType,
    currentVersion: Version | null,
    versions: Version[],
    history: Activity[],
    softDeleted: boolean,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.name = name;
    this.fileType = fileType;
    this.currentVersion = currentVersion;
    this.versions = versions;
    this.history = history;
    this.softDeleted = softDeleted;
  }

  static create(name: string, fileType: FileType) {
    const file = new File(name, fileType, null, [], [], false);
    return file;
  }

  public async addNewVersion(
    userId: string,
    content: Buffer,
    storageStrategyType: StorageStrategyType,
    storageStrategy: IStorageStrategy,
    metadata: Metadata | null,
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
      storageStrategyType,
      storageIdentifier,
      metadata,
    );

    const activity = new Activity(
      Operation.NEW_VERSION,
      this.currentVersion,
      version,
      userId,
      new Date(),
      null,
    );

    this.versions.push(version);
    this.currentVersion = version;
    this.history.push(activity);
  }

  public restoreVersion(
    version: Version,
    userId: string,
    reason: string | null,
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

  public softDelete(userId: string, reason: string | null): void {
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

  public getFileType(): FileType {
    return this.fileType;
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

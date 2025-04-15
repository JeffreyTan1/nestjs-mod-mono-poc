import { BaseAggregate } from '@/common/domain/base.aggregate';
import { Version } from './version.entity';
import { Activity } from './activity/activity.entity';

export class File extends BaseAggregate {
  private readonly name: string;
  private readonly currentVersion: Version | null;
  private readonly versions: Version[];
  private readonly activityHistory: Activity[];

  // TODO: Add versions to constructor
  constructor(name: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt);
    this.name = name;
  }

  async addNewVersion(content: Buffer) {
    throw new Error('Not implemented');
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
}

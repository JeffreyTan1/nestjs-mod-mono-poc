import { BaseEntity } from '@/common/domain/base.entity';
import { Operation } from './operation.enum';
import { Version } from '../version.entity';

export class Activity extends BaseEntity {
  private readonly reason: string;
  private readonly operation: Operation;

  private readonly previousVersion: Version | null;
  private readonly newVersion: Version;
  private readonly userId: string;
  private readonly timestamp: Date;

  constructor(
    reason: string,
    operation: Operation,
    previousVersion: Version | null,
    newVersion: Version,
    userId: string,
    timestamp: Date,
    id?: string,
  ) {
    super(id);
    this.reason = reason;
    this.operation = operation;
    this.previousVersion = previousVersion;
    this.newVersion = newVersion;
    this.userId = userId;
    this.timestamp = timestamp;
  }

  public getReason(): string {
    return this.reason;
  }

  public getOperation(): Operation {
    return this.operation;
  }

  public getPreviousVersion(): Version | null {
    return this.previousVersion;
  }

  public getNewVersion(): Version {
    return this.newVersion;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }
}

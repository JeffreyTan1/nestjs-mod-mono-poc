import { BaseEntity } from '@/common/domain/base.entity';
import { Operation } from './operation.enum';
import { Version } from '../version.entity';

export class Activity extends BaseEntity {
  private readonly operation: Operation;
  private readonly previousVersion: Version | null;
  private readonly newVersion: Version | null;
  private readonly userId: string;
  private readonly timestamp: Date;
  private readonly reason: string | null;

  constructor(
    operation: Operation,
    previousVersion: Version | null,
    newVersion: Version | null,
    userId: string,
    timestamp: Date,
    reason?: string,
    id?: string,
  ) {
    super(id);
    this.operation = operation;
    this.previousVersion = previousVersion;
    this.newVersion = newVersion;
    this.userId = userId;
    this.timestamp = timestamp;
    this.reason = reason ?? null;
  }

  public getReason(): string | null {
    return this.reason;
  }

  public getOperation(): Operation {
    return this.operation;
  }

  public getPreviousVersion(): Version | null {
    return this.previousVersion;
  }

  public getNewVersion(): Version | null {
    return this.newVersion;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }
}

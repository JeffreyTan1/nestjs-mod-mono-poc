import { BaseEntity } from '@/common/domain/base.entity';
import { Operation } from './operation.enum';
import { Version } from '../version.entity';
import { User } from '@/user/domain/user.aggregate';

export class Activity extends BaseEntity {
  private readonly reason: string;
  private readonly operation: Operation;

  private readonly previousVersion: Version | null;
  private readonly newVersion: Version;
  private readonly actor: User;
  private readonly timestamp: Date;

  constructor(
    reason: string,
    operation: Operation,
    previousVersion: Version | null,
    newVersion: Version,
    actor: User,
    timestamp: Date,
    id?: string,
  ) {
    super(id);
    this.reason = reason;
    this.operation = operation;
    this.previousVersion = previousVersion;
    this.newVersion = newVersion;
    this.actor = actor;
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

  public getActor(): User {
    return this.actor;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }
}

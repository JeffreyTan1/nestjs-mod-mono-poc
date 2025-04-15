import { BaseEntity } from '@/common/domain/base.entity';
import { Operation } from './operation.enum';
import { Version } from '../version.entity';
import { User } from '@/user/domain/user.aggregate';

export class Activity extends BaseEntity {
  private readonly operation: Operation;
  private readonly previousVersion: Version | null;
  private readonly newVersion: Version;
  private readonly reason: string;
  private readonly actor: User;
  private readonly timestamp: Date;

  constructor(
    operation: Operation,
    previousVersion: Version | null,
    newVersion: Version,
    reason: string,
    actor: User,
    id?: string,
  ) {
    super(id);
    this.operation = operation;
    this.previousVersion = previousVersion;
    this.newVersion = newVersion;
    this.reason = reason;
    this.actor = actor;
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

  public getReason(): string {
    return this.reason;
  }

  public getActor(): User {
    return this.actor;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }
}

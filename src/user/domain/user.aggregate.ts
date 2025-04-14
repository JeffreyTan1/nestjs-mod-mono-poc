import { BaseAggregate } from '@common/domain/base.aggregate';

export class User extends BaseAggregate {
  private readonly email: string;

  constructor(email: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt);
    this.email = email;
  }

  public getEmail(): string {
    return this.email;
  }
}

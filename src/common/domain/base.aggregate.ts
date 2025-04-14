import { v4 as uuidv4 } from 'uuid';

export abstract class BaseAggregate {
  protected readonly id: string;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id ?? uuidv4();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  protected updateUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}

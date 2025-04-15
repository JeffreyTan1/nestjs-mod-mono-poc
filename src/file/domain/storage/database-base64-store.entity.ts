import { BaseEntity } from '@/common/domain/base.entity';
import { IStorageStrategy } from './storage-strategy.interface';

export class DatabaseBase64Store
  extends BaseEntity
  implements IStorageStrategy
{
  public readonly identifier: string;
  private readonly base64: string;

  constructor(base64: string, id?: string) {
    super(id);
    this.base64 = base64;
    this.identifier = `database-base64-${this.id}`;
  }

  public getIdentifier(): string {
    return this.identifier;
  }

  public async store(file: File): Promise<void> {
    throw new Error('Not implemented');
  }

  public async retrieveUrl(): Promise<string> {
    return Promise.resolve(`data:image/png;base64,${this.base64}`);
  }

  public async delete(): Promise<void> {
    throw new Error('Not implemented');
  }
}

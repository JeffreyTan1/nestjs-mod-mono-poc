import { BaseEntity } from '@/common/domain/base.entity';
import { IStorageStrategy } from './storage-strategy.interface';

export class DatabaseBase64Store
  extends BaseEntity
  implements IStorageStrategy
{
  private readonly base64: string;

  constructor(base64: string, id?: string) {
    super(id);
    this.base64 = base64;
  }

  public async getUrl(): Promise<string> {
    return Promise.resolve(`data:image/png;base64,${this.base64}`);
  }
}

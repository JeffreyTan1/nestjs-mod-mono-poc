import { Injectable } from '@nestjs/common';
import { IStorageStrategyFactory } from '../domain/storage/storage-strategy-factory.interface';
import { IStorageStrategy } from '../domain/storage/storage-strategy.interface';
import { FileSystemStorageStrategy } from './file-system-storage.strategy';

@Injectable()
export class StorageStrategyFactory implements IStorageStrategyFactory {
  getStrategy(name: string): IStorageStrategy {
    switch (name) {
      case 'file-system':
        return new FileSystemStorageStrategy();
      default:
        throw new Error(`Storage strategy ${name} not found`);
    }
  }
}

import { IStorageStrategy } from './storage-strategy.interface';

export interface IStorageStrategyFactory {
  getStrategy(name: string): IStorageStrategy;
}

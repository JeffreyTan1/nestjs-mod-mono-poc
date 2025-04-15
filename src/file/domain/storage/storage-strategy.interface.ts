import { StorageStrategy } from './storage-strategy.enum';

export interface IStorageStrategy {
  storeAndReturnIdentifier(
    fileId: string,
    versionNumber: number,
    content: Buffer,
  ): Promise<string>;
  retrieve(fileId: string, versionNumber: number): Promise<Buffer>;
  delete(fileId: string, versionNumber: number): Promise<void>;
  getStorageStrategy(): StorageStrategy;
}

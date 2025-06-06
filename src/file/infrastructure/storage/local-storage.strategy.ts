import { IStorageStrategy } from '../../domain/storage/storage-strategy.interface';
import { promises as fs } from 'fs';
import { join } from 'path';

export class LocalStorageStrategy implements IStorageStrategy {
  private readonly basePath = join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'file-system-storage',
  );

  async storeAndReturnIdentifier(
    fileId: string,
    versionNumber: number,
    content: Buffer,
  ): Promise<string> {
    const dirPath = `${this.basePath}/${fileId}`;
    await fs.mkdir(dirPath, { recursive: true });
    const filePath = `${dirPath}/${versionNumber}`;
    await fs.writeFile(filePath, content);
    return filePath;
  }

  async retrieve(fileId: string, versionNumber: number): Promise<Buffer> {
    const filePath = `${this.basePath}/${fileId}/${versionNumber}`;
    return fs.readFile(filePath);
  }

  async delete(fileId: string, versionNumber: number): Promise<void> {
    const filePath = `${this.basePath}/${fileId}/${versionNumber}`;
    await fs.unlink(filePath);
  }
}

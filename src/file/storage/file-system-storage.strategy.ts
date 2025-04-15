import { IStorageStrategy } from '../domain/storage/storage-strategy.interface';
import { promises as fs } from 'fs';
import { join } from 'path';

export class FileSystemStorageStrategy implements IStorageStrategy {
  private readonly basePath = join(
    __dirname,
    '..',
    '..',
    '..',
    'file-system-storage',
  );
  private readonly name = 'file-system';

  async storeAndReturnIdentifier(
    fileId: string,
    versionNumber: number,
    content: Buffer,
  ): Promise<string> {
    const filePath = `${this.basePath}/${fileId}/${versionNumber}.txt`;
    await fs.writeFile(filePath, content);
    return filePath;
  }

  async retrieve(fileId: string, versionNumber: number): Promise<Buffer> {
    const filePath = `${this.basePath}/${fileId}/${versionNumber}.txt`;
    return fs.readFile(filePath);
  }

  async delete(fileId: string, versionNumber: number): Promise<void> {
    const filePath = `${this.basePath}/${fileId}/${versionNumber}.txt`;
    await fs.unlink(filePath);
  }

  getName(): string {
    return this.name;
  }
}

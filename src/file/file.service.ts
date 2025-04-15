import { Injectable } from '@nestjs/common';
import { IFileRepository } from './domain/file-repository.interface';
import { IStorageStrategyFactory } from './domain/storage/storage-strategy-factory.interface';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: IFileRepository,
    private readonly storageStrategyFactory: IStorageStrategyFactory,
  ) {}

  findAll() {
    return this.fileRepository.findAll();
  }

  findById(id: string) {
    return this.fileRepository.findById(id);
  }

  create() {
    return this.fileRepository.create();
  }

  addNewVersion(id: string) {
    return this.fileRepository.addNewVersion(id);
  }

  restoreVersion(id: string, versionId: string) {
    return this.fileRepository.restoreVersion(id, versionId);
  }

  delete(id: string) {
    return this.fileRepository.delete(id);
  }
}

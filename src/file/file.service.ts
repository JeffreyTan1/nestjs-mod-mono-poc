import { Injectable, NotFoundException } from '@nestjs/common';
import { IFileRepository } from './domain/file-repository.interface';
import { IStorageStrategyFactory } from './domain/storage/storage-strategy-factory.interface';
import { Metadata } from './domain/metadata.vo';
import { File } from './domain/file.aggregate';
import { FileType } from './domain/file-type.enum';

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

  async create(
    userId: string,
    content: Buffer,
    fileType: FileType,
    metadata?: Record<string, string>,
  ) {
    const file = File.create(content, fileType);
    await this.fileRepository.save(file);
    await this.addNewVersion(file.getId(), userId, content, 'local', metadata);
  }

  async addNewVersion(
    id: string,
    userId: string,
    content: Buffer,
    storageStrategyName: string,
    metadata?: Record<string, string>,
  ) {
    const storageStrategy =
      this.storageStrategyFactory.getStrategy(storageStrategyName);

    const file = await this.fileRepository.findById(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    await file.addNewVersion(
      content,
      userId,
      storageStrategy,
      metadata ? new Metadata(metadata) : undefined,
    );

    return this.fileRepository.save(file);
  }

  async restoreVersion(
    id: string,
    userId: string,
    versionId: string,
    reason?: string,
  ) {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    const version = file.getVersions().find((v) => v.getId() === versionId);
    if (!version) {
      throw new NotFoundException(`Version with id ${versionId} not found`);
    }

    file.restoreVersion(version, userId, reason);
    return this.fileRepository.save(file);
  }

  async softDelete(id: string, userId: string, reason?: string) {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    file.softDelete(userId, reason);
    return this.fileRepository.save(file);
  }
}

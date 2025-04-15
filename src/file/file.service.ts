import { Injectable, NotFoundException } from '@nestjs/common';
import { IFileRepository } from './domain/file-repository.interface';
import { IStorageStrategyFactory } from './domain/storage/storage-strategy-factory.interface';
import { Metadata, MetadataProps } from './domain/metadata.vo';
import { File } from './domain/file.aggregate';
import { FileType } from './domain/file-type.enum';
import { StorageStrategyType } from './domain/storage/storage-strategy-type.enum';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: IFileRepository,
    private readonly storageStrategyFactory: IStorageStrategyFactory,
  ) {}

  async findAll() {
    return await this.fileRepository.findAll();
  }

  async findById(id: string) {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return file;
  }

  async create(
    userId: string,
    name: string,
    fileType: FileType,
    content: Buffer,
    storageStrategyType: StorageStrategyType,
    metadata?: MetadataProps,
  ) {
    const file = File.create(name, fileType);

    await this.fileRepository.save(file);
    await this.addNewVersion(
      file.getId(),
      userId,
      content,
      storageStrategyType,
      metadata,
    );

    return file;
  }

  async addNewVersion(
    id: string,
    userId: string,
    content: Buffer,
    storageStrategyType: StorageStrategyType,
    metadata?: MetadataProps,
  ) {
    const storageStrategy =
      this.storageStrategyFactory.getStrategy(storageStrategyType);

    const file = await this.findById(id);

    await file.addNewVersion(
      userId,
      content,
      storageStrategyType,
      storageStrategy,
      metadata ? new Metadata(metadata) : null,
    );

    await this.fileRepository.save(file);
  }

  async restoreVersion(
    id: string,
    userId: string,
    versionId: string,
    reason?: string,
  ) {
    const file = await this.findById(id);

    const version = file.getVersions().find((v) => v.getId() === versionId);
    if (!version) {
      throw new NotFoundException(`Version with id ${versionId} not found`);
    }

    file.restoreVersion(version, userId, reason ?? null);
    await this.fileRepository.save(file);
  }

  async softDelete(id: string, userId: string, reason?: string) {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    file.softDelete(userId, reason ?? null);
    await this.fileRepository.save(file);
  }
}

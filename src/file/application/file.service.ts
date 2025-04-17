import { Injectable, NotFoundException } from '@nestjs/common';
import { Metadata, MetadataProps } from '../domain/metadata.vo';
import { File } from '../domain/file.aggregate';
import { FileType } from '../domain/file-type.enum';
import { StorageStrategyType } from '../domain/storage/storage-strategy-type.enum';
import { FileRepository } from '../infrastructure/file.repository';
import { StorageStrategyFactory } from '../infrastructure/storage/storage-strategy.factory';
import { FileProcessingService } from './file-processing.service';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly storageStrategyFactory: StorageStrategyFactory,
    private readonly fileProcessingService: FileProcessingService,
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
    const savedFile = await this.fileRepository.save(file);

    const fileWithVersion = await this.addNewVersion(
      savedFile.getId(),
      userId,
      content,
      storageStrategyType,
      metadata,
    );

    return fileWithVersion;
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
    const mimeType = await this.fileProcessingService.getFileMimeType(content);

    await file.addNewVersion(
      userId,
      content,
      mimeType,
      storageStrategyType,
      storageStrategy,
      metadata ? new Metadata(metadata) : null,
    );

    return await this.fileRepository.save(file);
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

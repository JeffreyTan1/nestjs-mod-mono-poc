import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileOrm } from './orm/file.orm';
import { FileMapper } from './file.mapper';
import { IFileRepository } from '../domain/file-repository.interface';
import { File } from '../domain/file.aggregate';

@Injectable()
export class FileRepository implements IFileRepository {
  constructor(
    @InjectRepository(FileOrm)
    private readonly fileRepository: Repository<FileOrm>,
    private readonly fileMapper: FileMapper,
  ) {}

  async findById(id: string): Promise<File | null> {
    const file = await this.fileRepository.findOne({ where: { id } });
    return file ? this.fileMapper.toDomain(file) : null;
  }

  async findAll(): Promise<File[]> {
    const files = await this.fileRepository.find();
    return files.map((file) => this.fileMapper.toDomain(file));
  }

  async save(file: File): Promise<File> {
    const fileOrm = this.fileMapper.toOrm(file);
    const savedFileOrm = await this.fileRepository.save(fileOrm);
    return this.fileMapper.toDomain(savedFileOrm);
  }

  async delete(file: File): Promise<void> {
    const fileOrm = this.fileMapper.toOrm(file);
    await this.fileRepository.remove(fileOrm);
  }
}

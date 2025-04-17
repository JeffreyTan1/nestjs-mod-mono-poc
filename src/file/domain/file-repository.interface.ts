import { IRepository } from '@/common/database/repository.interface';
import { File } from './file.aggregate';

export interface IFileRepository extends IRepository<File> {
  findAll(): Promise<File[]>;
}

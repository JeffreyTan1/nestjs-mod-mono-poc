import { IRepository } from '@common/domain/repository.interface';
import { File } from './file.aggregate';

export const FILE_REPOSITORY = Symbol('FILE_REPOSITORY');
export interface IFileRepository extends IRepository<File> {
  findAll(): Promise<File[]>;
}

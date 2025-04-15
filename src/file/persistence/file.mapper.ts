import { Injectable } from '@nestjs/common';
import { File } from '../domain/file.aggregate';
import { FileOrm } from './file.orm';

@Injectable()
export class FileMapper {
  toDomain(orm: FileOrm): File {
    throw new Error('TODO: Not implemented');
  }

  toOrm(domain: File): FileOrm {
    return {
      id: domain.getId(),
    };
  }
}

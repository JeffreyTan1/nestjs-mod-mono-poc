import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all file`;
  }

  findById(id: string) {
    return `This action returns a #${id} file`;
  }

  addNewVersion(id: string) {
    return `This action adds a new version to a #${id} file`;
  }

  restoreVersion(id: string, versionId: string) {
    return `This action restores a #${id} file to version #${versionId}`;
  }

  delete(id: string) {
    return `This action removes a #${id} file`;
  }
}

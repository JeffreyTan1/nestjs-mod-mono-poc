import { Injectable } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class FileProcessingService {
  async getFileMimeType(buffer: Buffer): Promise<string> {
    const result = await fileTypeFromBuffer(buffer);
    if (!result) {
      throw new Error('File type not supported');
    }

    return result.mime;
  }
}

import { IsDefined, IsEnum, IsJSON, IsString } from 'class-validator';
import { FileType } from '../domain/file-type.enum';

export class CreateFileDto {
  @IsDefined()
  @IsEnum(FileType)
  fileType: string;

  @IsJSON()
  metadata: string;

  // TODO, add enum in the domain layer
  @IsString()
  storageStrategy: string;
}

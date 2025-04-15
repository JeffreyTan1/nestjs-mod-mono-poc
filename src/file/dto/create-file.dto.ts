import { IsDefined, IsEnum, IsObject, IsString } from 'class-validator';
import { FileType } from '../domain/file-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty()
  @IsDefined()
  @IsEnum(FileType)
  fileType: FileType;

  @ApiProperty()
  @IsObject()
  metadata: Record<string, string>;

  // TODO, add enum in the domain layer
  @ApiProperty()
  @IsString()
  storageStrategy: string;
}

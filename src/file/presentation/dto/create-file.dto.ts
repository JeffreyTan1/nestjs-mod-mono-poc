import { IsEnum, IsObject, IsString } from 'class-validator';
import { FileType } from '../../domain/file-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { StorageStrategyType } from '../../domain/storage/storage-strategy-type.enum';

export class CreateFileDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(FileType)
  fileType: FileType;

  @ApiProperty()
  @IsObject()
  metadata: Record<string, string>;

  @ApiProperty()
  @IsEnum(StorageStrategyType)
  storageStrategyType: StorageStrategyType;
}

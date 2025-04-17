import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { FileType } from '../../domain/file-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { StorageStrategyType } from '../../domain/storage-strategy-type.enum';
import { ZodParseJsonRecord } from '@common/utils/ParseJsonRecord';
export class CreateFileDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(FileType)
  fileType: FileType;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  @ZodParseJsonRecord()
  metadata?: Record<string, string>;

  @ApiProperty()
  @IsEnum(StorageStrategyType)
  storageStrategyType: StorageStrategyType;
}

import { IsEnum, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StorageStrategyType } from '../../domain/storage/storage-strategy-type.enum';
import { ZodParseJsonRecord } from '@common/utils/ParseJsonRecord';
export class AddNewVersionDto {
  @ApiProperty()
  @IsObject()
  @IsOptional()
  @ZodParseJsonRecord()
  metadata?: Record<string, string>;

  @ApiProperty()
  @IsEnum(StorageStrategyType)
  storageStrategyType: StorageStrategyType;
}

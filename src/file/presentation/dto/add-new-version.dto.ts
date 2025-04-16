import { IsEnum, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StorageStrategyType } from '../../domain/storage/storage-strategy-type.enum';

export class AddNewVersionDto {
  @ApiProperty()
  @IsObject()
  @IsOptional()
  metadata?: Record<string, string>;

  @ApiProperty()
  @IsEnum(StorageStrategyType)
  storageStrategyType: StorageStrategyType;
}

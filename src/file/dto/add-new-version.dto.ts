import { IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StorageStrategyType } from '../domain/storage/storage-strategy-type.enum';

export class AddNewVersionDto {
  @ApiProperty()
  @IsObject()
  metadata: Record<string, string>;

  @ApiProperty()
  @IsEnum(StorageStrategyType)
  storageStrategy: StorageStrategyType;
}

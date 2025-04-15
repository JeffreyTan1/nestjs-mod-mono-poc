import { IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StorageStrategy } from '../domain/storage/storage-strategy.enum';

export class AddNewVersionDto {
  @ApiProperty()
  @IsObject()
  metadata: Record<string, string>;

  @ApiProperty()
  @IsEnum(StorageStrategy)
  storageStrategy: StorageStrategy;
}

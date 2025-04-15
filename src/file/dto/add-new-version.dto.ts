import { IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddNewVersionDto {
  @ApiProperty()
  @IsObject()
  metadata: Record<string, string>;

  // TODO, add enum in the domain layer
  @ApiProperty()
  @IsString()
  storageStrategy: string;
}

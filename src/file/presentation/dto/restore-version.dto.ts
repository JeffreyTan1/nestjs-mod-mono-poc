import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RestoreVersionDto {
  @ApiProperty()
  @IsString()
  reason?: string;
}

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteFileDto {
  @ApiProperty()
  @IsString()
  reason?: string;
}

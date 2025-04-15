import { IsString } from 'class-validator';

export class RestoreVersionDto {
  @IsString()
  reason?: string;
}

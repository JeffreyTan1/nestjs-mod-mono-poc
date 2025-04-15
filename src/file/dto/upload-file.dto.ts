import { IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

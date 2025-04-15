import { IsJSON, IsString } from 'class-validator';

export class AddNewVersionDto {
  @IsJSON()
  metadata: string;

  // TODO, add enum in the domain layer
  @IsString()
  storageStrategy: string;
}

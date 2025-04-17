import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  fileType: string;

  @ApiProperty()
  currentVersion: VersionDto | null;

  @ApiProperty()
  versions: VersionDto[];

  @ApiProperty()
  history: ActivityDto[];

  @ApiProperty()
  softDeleted: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class VersionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  versionNumber: number;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  storageStrategy: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  metadata: MetadataDto | null;
}

export class ActivityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  operation: string;

  @ApiProperty()
  previousVersion: VersionDto | null;

  @ApiProperty()
  newVersion: VersionDto | null;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  reason: string | null;
}

export class MetadataDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}

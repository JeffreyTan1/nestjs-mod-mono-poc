import { Injectable } from '@nestjs/common';
import { File } from '../../domain/file.aggregate';
import { FileDto, VersionDto, ActivityDto } from './file.dto';
import { Version } from '../../domain/version.entity';
import { Activity } from '../../domain/activity.entity';

@Injectable()
export class FileDtoMapper {
  toDtoList(files: File[]): FileDto[] {
    return files.map((file) => this.toDto(file));
  }

  toDto(file: File): FileDto {
    const currentVersion = file.getCurrentVersion();
    return {
      id: file.getId(),
      name: file.getName(),
      fileType: file.getFileType().toString(),
      currentVersion: currentVersion ? this.toVersionDto(currentVersion) : null,
      versions: file.getVersions().map((version) => this.toVersionDto(version)),
      history: file
        .getHistory()
        .map((activity) => this.toActivityDto(activity)),
      softDeleted: file.getSoftDeleted(),
      createdAt: file.getCreatedAt(),
      updatedAt: file.getUpdatedAt(),
    };
  }

  private toVersionDto(version: Version): VersionDto {
    const metadata = version.getMetadata();
    return {
      id: version.getId(),
      versionNumber: version.getVersionNumber(),
      mimeType: version.getMimeType(),
      storageStrategy: version.getStorageStrategy().toString(),
      url: version.getStorageIdentifier(),
      metadata: metadata ? metadata.getValue() : null,
    };
  }

  private toActivityDto(activity: Activity): ActivityDto {
    const previousVersion = activity.getPreviousVersion();
    const newVersion = activity.getNewVersion();
    return {
      id: activity.getId(),
      operation: activity.getOperation().toString(),
      previousVersion: previousVersion
        ? this.toVersionDto(previousVersion)
        : null,
      newVersion: newVersion ? this.toVersionDto(newVersion) : null,
      userId: activity.getUserId(),
      timestamp: activity.getTimestamp(),
      reason: activity.getReason(),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { File } from '../../domain/file.aggregate';
import { FileDto, VersionDto, ActivityDto, MetadataDto } from './file.dto';
import { Version } from '../../domain/version.entity';
import { Activity } from '../../domain/activity/activity.entity';
import { Metadata } from '../../domain/metadata.vo';

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
      metadata: metadata ? this.toMetadataDto(metadata) : null,
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

  private toMetadataDto(metadata: Metadata): MetadataDto {
    const metadataProps = metadata.getValue();
    const entries = Object.entries(metadataProps);

    if (entries.length > 0) {
      const [key, value] = entries[0];
      return { key, value };
    }

    return { key: '', value: '' };
  }
}

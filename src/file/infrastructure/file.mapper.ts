import { Injectable } from '@nestjs/common';
import { File } from '../domain/file.aggregate';
import { FileOrm } from './orm/file.orm';
import { parseEnumStrict } from '@common/utils/parseEnumStrict';
import { FileType } from '../domain/file-type.enum';
import { VersionOrm } from './orm/version.orm';
import { Version } from '../domain/version.entity';
import { StorageStrategyType } from '../domain/storage/storage-strategy-type.enum';
import { ActivityOrm } from './orm/activity.orm';
import { Metadata } from '../domain/metadata.vo';
import { Activity } from '../domain/activity/activity.entity';
import { Operation } from '../domain/activity/operation.enum';

@Injectable()
export class FileMapper {
  toDomain(orm: FileOrm): File {
    const fileType = parseEnumStrict(FileType, orm.fileType);
    const currentVersion = orm.currentVersion
      ? this.toDomainVersion(orm.currentVersion)
      : null;
    const versions = orm.versions.map(this.toDomainVersion);
    const history = orm.history.map((activity) =>
      this.toDomainActivity(activity),
    );
    return new File(
      orm.name,
      fileType,
      currentVersion,
      versions,
      history,
      orm.softDeleted,
      orm.id,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  private toDomainVersion(orm: VersionOrm): Version {
    const storageStrategy = parseEnumStrict(
      StorageStrategyType,
      orm.storageStrategy,
    );
    const metadata = orm.metadata ? new Metadata(orm.metadata) : null;
    return new Version(
      orm.versionNumber,
      orm.mimeType,
      storageStrategy,
      orm.storageIdentifier,
      metadata,
      orm.id,
    );
  }

  private toDomainActivity(orm: ActivityOrm): Activity {
    const operation = parseEnumStrict(Operation, orm.operation);
    const fromVersion = orm.fromVersion
      ? this.toDomainVersion(orm.fromVersion)
      : null;
    const toVersion = orm.toVersion
      ? this.toDomainVersion(orm.toVersion)
      : null;
    return new Activity(
      operation,
      fromVersion,
      toVersion,
      orm.userId,
      orm.timestamp,
      orm.reason,
      orm.id,
    );
  }

  toOrm(domain: File): FileOrm {
    const currentVersion = domain.getCurrentVersion();
    const orm = new FileOrm();

    orm.id = domain.getId();
    orm.name = domain.getName();
    orm.fileType = domain.getFileType();
    orm.createdAt = domain.getCreatedAt();
    orm.updatedAt = domain.getUpdatedAt();
    orm.softDeleted = domain.getSoftDeleted();

    // Set up the versions
    orm.versions = domain.getVersions().map((version) => {
      const versionOrm = this.toOrmVersion(version);
      versionOrm.file = orm;
      return versionOrm;
    });

    // Set up the current version
    if (currentVersion) {
      const currentVersionOrm = this.toOrmVersion(currentVersion);
      currentVersionOrm.file = orm;
      orm.currentVersion = currentVersionOrm;
    }

    // Set up the history
    orm.history = domain.getHistory().map((activity) => {
      const activityOrm = this.toOrmActivity(activity);
      activityOrm.file = orm;
      return activityOrm;
    });

    return orm;
  }

  private toOrmVersion(domain: Version): VersionOrm {
    const metadata = domain.getMetadata();
    const metadataValue = metadata ? metadata.getValue() : null;
    const orm = new VersionOrm();

    orm.id = domain.getId();
    orm.versionNumber = domain.getVersionNumber();
    orm.mimeType = domain.getMimeType();
    orm.storageStrategy = domain.getStorageStrategy();
    orm.storageIdentifier = domain.getStorageIdentifier();
    orm.metadata = metadataValue;

    return orm;
  }

  private toOrmActivity(domain: Activity): ActivityOrm {
    const orm = new ActivityOrm();

    orm.id = domain.getId();
    orm.operation = domain.getOperation();
    orm.userId = domain.getUserId();
    orm.timestamp = domain.getTimestamp();
    orm.reason = domain.getReason();

    const previousVersion = domain.getPreviousVersion();
    const newVersion = domain.getNewVersion();

    if (previousVersion) {
      orm.fromVersion = this.toOrmVersion(previousVersion);
    }

    if (newVersion) {
      orm.toVersion = this.toOrmVersion(newVersion);
    }

    return orm;
  }
}

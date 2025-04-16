import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from './persistence/file.repository';
import { FileMapper } from './persistence/file.mapper';
import { FileOrm } from './persistence/orm/file.orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageStrategyFactory } from './storage/storage-strategy.factory';
@Module({
  imports: [TypeOrmModule.forFeature([FileOrm])],
  providers: [FileService, FileRepository, FileMapper, StorageStrategyFactory],
  controllers: [FileController],
})
export class FileModule {}

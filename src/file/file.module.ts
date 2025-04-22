import { Module } from '@nestjs/common';
import { FileService } from './application/file.service';
import { FileController } from './presentation/file.controller';
import { FileRepository } from './infrastructure/file.repository';
import { FileMapper } from './infrastructure/file.mapper';
import { FileOrm } from './infrastructure/orm/file.orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageStrategyFactory } from './infrastructure/storage/storage-strategy.factory';
import { AuthModule } from '@auth/auth.module';
import { FileDtoMapper } from './presentation/dto/file-dto.mapper';
import { FileProcessingService } from './application/file-processing.service';
import { FILE_REPOSITORY } from './domain/file-repository.interface';
import { STORAGE_STRATEGY_FACTORY } from './domain/storage/storage-strategy-factory.interface';

@Module({
  imports: [TypeOrmModule.forFeature([FileOrm]), AuthModule],
  providers: [
    {
      provide: FILE_REPOSITORY,
      useClass: FileRepository,
    },
    {
      provide: STORAGE_STRATEGY_FACTORY,
      useClass: StorageStrategyFactory,
    },
    FileService,
    FileMapper,
    FileDtoMapper,
    FileProcessingService,
  ],
  controllers: [FileController],
})
export class FileModule {}

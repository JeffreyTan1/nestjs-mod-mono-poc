import { Module } from '@nestjs/common';
import { FileService } from './application/file.service';
import { FileController } from './presentation/file.controller';
import { FileRepository } from './infrastructure/file.repository';
import { FileMapper } from './infrastructure/file.mapper';
import { FileOrm } from './infrastructure/orm/file.orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageStrategyFactory } from './infrastructure/storage/storage-strategy.factory';
import { AuthModule } from '@auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([FileOrm]), AuthModule],
  providers: [FileService, FileRepository, FileMapper, StorageStrategyFactory],
  controllers: [FileController],
})
export class FileModule {}

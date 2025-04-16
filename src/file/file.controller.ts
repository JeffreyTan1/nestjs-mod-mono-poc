import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ParseUUIDV4Pipe } from '@common/utils/parse-uuid-v4.pipe';
import { CreateFileDto } from './dto/create-file.dto';
import { AddNewVersionDto } from './dto/add-new-version.dto';
import { DummyGuard } from '@auth/dummy/dummy.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/delete-file.dto';
import { UserCtx } from '@auth/user-context.decorator';
import { RestoreVersionDto } from './dto/restore-version.dto';
import { FileDto } from './dto/file.dto';
import { File } from './domain/file.aggregate';

@UseGuards(DummyGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async findAll() {
    const files = await this.fileService.findAll();
    return this.toFileDtoList(files);
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDV4Pipe()) id: string) {
    const file = await this.fileService.findById(id);
    return this.toFileDto(file);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
    @UserCtx() userId: string,
  ) {
    const { name, fileType, metadata, storageStrategyType } = createFileDto;
    return this.fileService.create(
      userId,
      name,
      fileType,
      file.buffer,
      storageStrategyType,
      metadata,
    );
  }

  @Post(':id/version')
  @UseInterceptors(FileInterceptor('file'))
  addNewVersion(
    @Param('id', new ParseUUIDV4Pipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() addFileVersionDto: AddNewVersionDto,
    @UserCtx() userId: string,
  ) {
    const { storageStrategyType, metadata } = addFileVersionDto;
    return this.fileService.addNewVersion(
      id,
      userId,
      file.buffer,
      storageStrategyType,
      metadata,
    );
  }

  @Post(':id/version/:versionId/restore')
  restoreVersion(
    @Param('id', new ParseUUIDV4Pipe()) id: string,
    @Param('versionId', new ParseUUIDV4Pipe()) versionId: string,
    @Body() restoreVersionDto: RestoreVersionDto,
    @UserCtx() userId: string,
  ) {
    const { reason } = restoreVersionDto;
    return this.fileService.restoreVersion(id, userId, versionId, reason);
  }

  @Post(':id/delete')
  async softDelete(
    @Param('id', new ParseUUIDV4Pipe()) id: string,
    @Body() deleteFileDto: DeleteFileDto,
    @UserCtx() userId: string,
  ) {
    const { reason } = deleteFileDto;
    await this.fileService.softDelete(id, userId, reason);
  }

  private toFileDtoList(files: File[]): FileDto[] {
    return files.map((file) => this.toFileDto(file));
  }

  private toFileDto(file: File): FileDto {
    return {
      id: file.getId(),
      name: file.getName(),
      fileType: file.getFileType(),
      createdAt: file.getCreatedAt(),
      updatedAt: file.getUpdatedAt(),
    };
  }
}

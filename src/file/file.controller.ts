import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ParseUUIDV4Pipe } from '@/common/utils/parse-uuid-v4.pipe';
import { CreateFileDto } from './dto/create-file.dto';
import { AddNewVersionDto } from './dto/add-new-version.dto';
import { DummyGuard } from '@/auth/dummy/dummy.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/delete-file.dto';
import { UserCtx } from '@/auth/user-context.decorator';
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
    return this.toFileDtos(files);
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDV4Pipe()) id: string) {
    const file = await this.fileService.findById(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return this.toFileDto(file);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
    @UserCtx() userId: string,
  ) {
    return this.fileService.create(
      userId,
      file.buffer,
      createFileDto.fileType,
      createFileDto.metadata,
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
    return this.fileService.addNewVersion(
      id,
      userId,
      file.buffer,
      addFileVersionDto.storageStrategy,
      addFileVersionDto.metadata,
    );
  }

  @Post(':id/version/:versionId/restore')
  restoreVersion(
    @Param('id', new ParseUUIDV4Pipe()) id: string,
    @Param('versionId', new ParseUUIDV4Pipe()) versionId: string,
    @Body() restoreVersionDto: RestoreVersionDto,
    @UserCtx() userId: string,
  ) {
    return this.fileService.restoreVersion(
      id,
      userId,
      versionId,
      restoreVersionDto.reason,
    );
  }

  @Post(':id/delete')
  async softDelete(
    @Param('id', new ParseUUIDV4Pipe()) id: string,
    @Body() deleteFileDto: DeleteFileDto,
    @UserCtx() userId: string,
  ) {
    await this.fileService.softDelete(id, userId, deleteFileDto.reason);
  }

  private toFileDtos(files: File[]): FileDto[] {
    return files.map((file) => this.toFileDto(file));
  }

  private toFileDto(file: File): FileDto {
    return {
      id: file.getId(),
      fileType: file.getFileType(),
      createdAt: file.getCreatedAt(),
      updatedAt: file.getUpdatedAt(),
    };
  }
}

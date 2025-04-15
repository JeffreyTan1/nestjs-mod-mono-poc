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
import { ParseUUIDV4Pipe } from '@/common/utils/parse-uuid-v4.pipe';
import { CreateFileDto } from './dto/create-file.dto';
import { AddNewVersionDto } from './dto/add-new-version.dto';
import { DummyGuard } from '@/auth/dummy/dummy.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/delete-file.dto';
import { UserCtx } from '@/auth/user-context.decorator';
import { RestoreVersionDto } from './dto/restore-version.dto';

@UseGuards(DummyGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDV4Pipe()) id: string) {
    return this.fileService.findById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
    @UserCtx() userId: string,
  ) {
    // return this.fileService.create(userId, file.buffer, createFileDto);
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
      JSON.parse(addFileVersionDto.metadata),
      addFileVersionDto.storageStrategy,
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
}

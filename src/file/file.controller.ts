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
import { AddFileVersionDto } from './dto/add-file-version.dto';
import { DummyGuard } from '@/auth/dummy/dummy.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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
  ) {
    // return this.fileService.create(createFileDto);
  }

  @Post(':id/version')
  @UseInterceptors(FileInterceptor('file'))
  addNewVersion(
    @Param('id', new ParseUUIDV4Pipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() addFileVersionDto: AddFileVersionDto,
  ) {
    return this.fileService.addNewVersion(
      id,
      '123',
      file.buffer,
      addFileVersionDto.metadata,
      addFileVersionDto.storageStrategy,
    );
  }

  //TODO: add body
  @Post(':id/version/:versionId/restore')
  restoreVersion(
    @Param('id', new ParseUUIDV4Pipe()) id: string,
    @Param('versionId', new ParseUUIDV4Pipe()) versionId: string,
  ) {
    return this.fileService.restoreVersion(id, '123', versionId);
  }

  @Post(':id/delete')
  async softDelete(@Param('id', new ParseUUIDV4Pipe()) id: string) {
    await this.fileService.softDelete(id, '123');
  }
}

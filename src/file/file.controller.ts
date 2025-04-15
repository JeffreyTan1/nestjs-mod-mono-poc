import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { ParseUUIDV4Pipe } from '@/common/utils/parse-uuid-v4.pipe';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDV4Pipe()) id: string) {
    return this.fileService.findById(id);
  }

  //TODO: add body
  @Post(':id/version')
  addNewVersion(@Param('id', new ParseUUIDV4Pipe()) id: string) {
    return this.fileService.addNewVersion(id);
  }

  //TODO: add body
  @Post(':id/version/:versionId/restore')
  restoreVersion(
    @Param('id', new ParseUUIDV4Pipe()) id: string,
    @Param('versionId', new ParseUUIDV4Pipe()) versionId: string,
  ) {
    return this.fileService.restoreVersion(id, versionId);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDV4Pipe()) id: string) {
    return this.fileService.delete(id);
  }
}

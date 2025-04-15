import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './domain/user.aggregate';
import { ParseEmailPipe } from './utils/parse-email.pipe';
import { DummyGuard } from '@/auth/dummy/dummy.guard';

@UseGuards(DummyGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.toUserDto(user);
  }

  @Get(':email')
  async findByEmail(@Param('email', ParseEmailPipe) email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toUserDto(user);
  }

  @Delete(':email')
  async deleteByEmail(@Param('email', ParseEmailPipe) email: string) {
    await this.userService.deleteByEmail(email);
  }

  private toUserDto(user: User): UserDto {
    return {
      id: user.getId(),
      email: user.getEmail(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}

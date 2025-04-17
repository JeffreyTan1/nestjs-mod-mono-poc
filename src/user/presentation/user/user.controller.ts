import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../../application/user.service';
import { ParseEmailPipe } from '../../utils/parse-email.pipe';
import { JwtGuard } from '@/auth/jwt/jwt.guard';
import { UserDtoMapper } from '../dto/user-dto.mapper';
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userDtoMapper: UserDtoMapper,
  ) {}

  @Get(':email')
  async findByEmail(@Param('email', ParseEmailPipe) email: string) {
    const user = await this.userService.findByEmail(email);
    return this.userDtoMapper.toDto(user);
  }

  @Delete(':email')
  async deleteByEmail(@Param('email', ParseEmailPipe) email: string) {
    await this.userService.deleteByEmail(email);
  }
}

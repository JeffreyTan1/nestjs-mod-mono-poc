import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../../application/user.service';
import { UserDtoMapper } from '../user-dto.mapper';

@Controller('backdoor')
export class BackdoorController {
  constructor(
    private readonly userService: UserService,
    private readonly userDtoMapper: UserDtoMapper,
  ) {}

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userService.create(email);
    return this.userDtoMapper.toDto(user);
  }
}

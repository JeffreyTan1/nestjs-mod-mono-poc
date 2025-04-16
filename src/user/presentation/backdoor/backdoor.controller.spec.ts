import { Test, TestingModule } from '@nestjs/testing';
import { BackdoorController } from './backdoor.controller';
import { UserService } from '../../application/user.service';
import { UserDtoMapper } from '../user-dto.mapper';
import { User } from '../../domain/user.aggregate';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

describe('BackdoorController', () => {
  let controller: BackdoorController;
  let userService: UserService;
  let userDtoMapper: UserDtoMapper;

  const mockUser: User = {
    getId: jest.fn().mockReturnValue('1'),
    getEmail: jest.fn().mockReturnValue('test@example.com'),
    getCreatedAt: jest.fn().mockReturnValue(new Date()),
    getUpdatedAt: jest.fn().mockReturnValue(new Date()),
  } as unknown as User;

  const mockUserDto: UserDto = {
    id: '1',
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackdoorController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: UserDtoMapper,
          useValue: {
            toDto: jest.fn().mockReturnValue(mockUserDto),
          },
        },
      ],
    }).compile();

    controller = module.get<BackdoorController>(BackdoorController);
    userService = module.get<UserService>(UserService);
    userDtoMapper = module.get<UserDtoMapper>(UserDtoMapper);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user and return user dto', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
      };

      jest.spyOn(userService, 'create').mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto.email);
      expect(userDtoMapper.toDto).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUserDto);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../application/user.service';
import { NotFoundException } from '@nestjs/common';
import { User } from '../../domain/user.aggregate';
import { UserDto } from '../dto/user.dto';
import { UserDtoMapper } from '../user-dto.mapper';

describe('UserController', () => {
  let controller: UserController;
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
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            deleteByEmail: jest.fn(),
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

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    userDtoMapper = module.get<UserDtoMapper>(UserDtoMapper);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should return user dto when user exists', async () => {
      const email = 'test@example.com';
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);

      const result = await controller.findByEmail(email);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(userDtoMapper.toDto).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUserDto);
    });

    it('should propagate NotFoundException when user does not exist', async () => {
      const email = 'nonexistent@example.com';
      jest
        .spyOn(userService, 'findByEmail')
        .mockRejectedValue(new NotFoundException('User not found'));

      await expect(controller.findByEmail(email)).rejects.toThrow(
        NotFoundException,
      );
      expect(userService.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('deleteByEmail', () => {
    it('should remove user successfully', async () => {
      const email = 'test@example.com';
      jest.spyOn(userService, 'deleteByEmail').mockResolvedValue(undefined);

      await controller.deleteByEmail(email);

      expect(userService.deleteByEmail).toHaveBeenCalledWith(email);
    });
  });
});

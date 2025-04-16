import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../presentation/user.controller';
import { UserService } from '../application/user.service';
import { NotFoundException } from '@nestjs/common';
import { User } from '../domain/user.aggregate';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UserDto } from '../presentation/dto/user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

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
            create: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and return user dto', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
      };

      jest.spyOn(userService, 'create').mockResolvedValue(mockUser);

      const result = await controller.create(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUserDto);
    });
  });

  describe('findByEmail', () => {
    it('should return user dto when user exists', async () => {
      const email = 'test@example.com';
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);

      const result = await controller.findByEmail(email);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(mockUserDto);
    });

    it('should throw NotFoundException when user does not exist', async () => {
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

import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './persistence/user.repository';
import { User } from './domain/user.aggregate';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';
import { IUserRepository } from './domain/user-repository.interface';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(async () => {
    const mockUserRepository: jest.Mocked<IUserRepository> = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com' };
      const mockUser = new User(createUserDto.email);
      userRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(userRepository.save).toHaveBeenCalledWith(expect.any(User));
      expect(result).toBe(mockUser);
    });
  });

  describe('findByEmail', () => {
    it('should return a user when found', async () => {
      const email = 'test@example.com';
      const mockUser = new User(email);
      userRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.findByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toBe(mockUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const email = 'nonexistent@example.com';
      userRepository.findByEmail.mockResolvedValue(null);

      await expect(service.findByEmail(email)).rejects.toThrow(
        NotFoundException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('deleteByEmail', () => {
    it('should delete a user', async () => {
      const email = 'test@example.com';
      const mockUser = new User(email);
      userRepository.findByEmail.mockResolvedValue(mockUser);
      userRepository.delete.mockResolvedValue(undefined);

      await service.deleteByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(userRepository.delete).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException when trying to remove non-existent user', async () => {
      const email = 'nonexistent@example.com';
      userRepository.findByEmail.mockResolvedValue(null);

      await expect(service.deleteByEmail(email)).rejects.toThrow(
        NotFoundException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(userRepository.delete).not.toHaveBeenCalled();
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUsersRepository = {
    findByEmail: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully create a new user when email is unique', async () => {
      const createUserDto: CreateUserDto = {
        username: 'new_user',
        email: 'unique@example.com',
        fullName: 'New Unique User',
      };

      const expectedUser = {
        id: 1,
        ...createUserDto,
        createdAt: new Date(),
      };

      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.save.mockResolvedValue(expectedUser);

      const result = await service.create(createUserDto);

      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(mockUsersRepository.save).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedUser);
    });

    it('should throw ConflictException when email already exists in database', async () => {
      const createUserDto: CreateUserDto = {
        username: 'duplicate_user',
        email: 'existing@example.com',
        fullName: 'Duplicate User',
      };

      const existingUser = {
        id: 99,
        username: 'old_user',
        email: 'existing@example.com',
        fullName: 'Existing User',
        createdAt: new Date(),
      };

      mockUsersRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(async () => {
        await service.create(createUserDto);
      }).rejects.toThrow(ConflictException);

      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(mockUsersRepository.save).not.toHaveBeenCalled();
    });
  });
});

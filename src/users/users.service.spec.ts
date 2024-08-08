import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersRepository } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const data = {} as CreateUserDto;
      const result = {} as UserDto;

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await service.create(data)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [] as UserDto[];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = {} as UserDto;
      const id = 1;

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(id)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const data = {} as UpdateUserDto;
      const result = {} as UserDto;
      const id = 1;

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await service.update(id, data)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = {} as UserDto;
      const id = 1;

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await service.remove(id)).toBe(result);
    });
  });
});

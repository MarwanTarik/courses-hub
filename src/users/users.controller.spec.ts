import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {} as CreateUserDto;
    const result = {} as UserDto;
    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await controller.create(createUserDto)).toBe(result);
  });

  it('should return a list of users', async () => {
    const result = [] as UserDto[];

    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a user', async () => {
    const result = {} as UserDto;

    jest.spyOn(service, 'findOne').mockImplementation(async () => result);

    expect(await controller.findOne('1')).toBe(result);
  });

  it('should update a user', async () => {
    const updateUserDto: CreateUserDto = {} as CreateUserDto;
    const result = {} as UserDto;
    const id = '1';
    jest.spyOn(service, 'update').mockImplementation(async () => result);

    expect(await controller.update(id, updateUserDto)).toBe(result);
  });

  it('should delete a user', async () => {
    const result = {} as UserDto;
    const id = '1';
    jest.spyOn(service, 'remove').mockImplementation(async () => result);

    expect(await controller.remove(id)).toBe(result);
  });
});

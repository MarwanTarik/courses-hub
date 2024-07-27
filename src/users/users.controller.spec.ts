import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
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
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
      phonenumber: '1234567890',
      address: '123 Main Street',
      gender: Gender.male,
      role: Role.student,
    };
    const result = { id: 1, ...createUserDto };
    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await controller.create(createUserDto)).toBe(result);
  });

  it('should return a list of users', async () => {
    const result: UserDto[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        phonenumber: '1234567890',
        address: '123 Main Street',
        gender: Gender.male,
        role: Role.student,
      },
      {
        id: 2,
        name: 'Doe',
        email: 'Doe@gmail.com',
        password: 'password',
        phonenumber: '023403493478',
        address: '123 Main Street',
        gender: Gender.male,
        role: Role.student,
      },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a user', async () => {
    const result: UserDto = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
      phonenumber: '1234567890',
      address: '123 Main Street',
      gender: Gender.male,
      role: Role.student,
    };
    jest.spyOn(service, 'findOne').mockImplementation(async () => result);

    expect(await controller.findOne('1')).toBe(result);
  });

  it('should update a user', async () => {
    const updateData = {
      name: 'starlight',
      email: 'starlight@gmail.com',
    };

    const user: UserDto = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
      phonenumber: '1234567890',
      address: '123 Main Street',
      gender: Gender.male,
      role: Role.student,
    };

    const result = { ...user, ...updateData };
    jest.spyOn(service, 'update').mockImplementation(async () => result);

    expect(await controller.update('1', updateData)).toBe(result);
  });

  it('should delete a user', async () => {
    const users: UserDto[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        phonenumber: '1234567890',
        address: '123 Main Street',
        gender: Gender.male,
        role: Role.student,
      },
      {
        id: 2,
        name: 'Doe',
        email: 'Doe@gmail.com',
        password: 'password',
        phonenumber: '023403493478',
        address: '123 Main Street',
        gender: Gender.male,
        role: Role.student,
      },
    ];

    const id = '2';
    const result = users[+id - 1];
    jest.spyOn(service, 'remove').mockImplementation(async () => result);

    expect(await controller.remove(id)).toBe(result);
  });
});

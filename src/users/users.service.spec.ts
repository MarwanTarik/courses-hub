import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Gender, Role } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
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
      const result = { id: 1, ...createUserDto, role_id: undefined };
      jest.spyOn(prismaService.users, 'create').mockResolvedValue(result);

      expect(await service.create(createUserDto)).toBe(result);
      expect(prismaService.users.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          role: {
            connect: {
              role: createUserDto.role,
            },
          },
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: 'password',
          phonenumber: '1234567890',
          address: '123 Main Street',
          gender: Gender.male,
          role: {
            role: Role.student,
          },
        },
        {
          id: 2,
          name: 'Doe',
          email: 'Doe@gmail.com',
          password: 'password',
          phonenumber: '023403493478',
          address: '123 Main Street',
          gender: Gender.male,
          role: {
            role: Role.student,
          },
        },
      ];

      jest
        .spyOn(prismaService.users, 'findMany')
        .mockResolvedValue(users as any);

      const result = users.map((user) => {
        return { ...user, role: user.role.role };
      });

      expect(await service.findAll()).toEqual(result);
      expect(prismaService.users.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const users = [
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: 'password',
          phonenumber: '1234567890',
          address: '123 Main Street',
          gender: Gender.male,
          role: {
            role: Role.student,
          },
        },
        {
          id: 2,
          name: 'Doe',
          email: 'Doe@gmail.com',
          password: 'password',
          phonenumber: '023403493478',
          address: '123 Main Street',
          gender: Gender.male,
          role: {
            role: Role.student,
          },
        },
      ];
      const id = 1;
      jest
        .spyOn(prismaService.users, 'findUnique')
        .mockResolvedValue(users[id - 1] as any);

      expect(await service.findOne(id)).toEqual({
        ...users[id - 1],
        role: users[id - 1].role.role,
      });
      expect(prismaService.users.findUnique).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          address: true,
          phonenumber: true,
          gender: true,
          role: {
            select: {
              role: true,
            },
          },
        },
        where: {
          id,
        },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        phonenumber: '1234567890',
        address: '123 Main Street',
        gender: Gender.male,
        role: {
          role: Role.student,
        },
      };
      const updateUserDto: UpdateUserDto = { name: 'Jane Doe' };
      const id = user.id;

      const result = { ...updateUserDto, ...user } as any;
      jest.spyOn(prismaService.users, 'update').mockResolvedValue(result);

      expect(await service.update(id, updateUserDto)).toEqual({
        ...result,
        role: user.role.role,
      });
      expect(prismaService.users.update).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          address: true,
          phonenumber: true,
          gender: true,
          role: {
            select: {
              role: true,
            },
          },
        },
        data: {
          name: updateUserDto?.name,
          email: updateUserDto?.email,
          address: updateUserDto?.address,
          phonenumber: updateUserDto?.phonenumber,
          gender: updateUserDto?.gender,
          ...(updateUserDto?.role && {
            role: {
              connect: {
                role: updateUserDto.role,
              },
            },
          }),
        },
        where: { id },
      });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        phonenumber: '1234567890',
        address: '123 Main Street',
        gender: Gender.male,
        role: Role.student,
        role_id: undefined,
      };
      jest.spyOn(prismaService.users, 'delete').mockResolvedValue(user);

      expect(await service.remove(1)).toBe(user);
      expect(prismaService.users.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { name, email, password, phonenumber, address, gender, role } =
      createUserDto;

    return this.prisma.users.create({
      data: {
        name,
        email,
        password,
        phonenumber,
        address,
        gender,
        role: {
          connect: { role },
        },
      },
    });
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.users.findMany({
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
    });

    return users.map((user) => ({
      ...user,
      role: user.role?.role,
    }));
  }

  async findOne(id: number): Promise<UserDto> {
    let user;
    try {
      user = await this.prisma.users.findUnique({
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
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      ...user,
      role: user.role?.role,
    };
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    return await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.prisma.users.update({
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

    return {
      ...user,
      role: user.role?.role,
    };
  }

  async remove(id: number): Promise<UserDto> {
    let user: UserDto;
    try {
      user = await this.prisma.users.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}

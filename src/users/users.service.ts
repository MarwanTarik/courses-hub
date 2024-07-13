import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async findOne(id: number): Promise<Users> {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    return this.prisma.users.update({
      data: {
        ...updateUserDto,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<Users> {
    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}

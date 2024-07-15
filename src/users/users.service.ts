import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { name, email, password, phonenumber, address, gender, roleId } =
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
          connect: { id: roleId },
        },
      },
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

  async findOneByEmail(email: string): Promise<Users> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const updateData: Prisma.UsersUpdateInput = {
      ...Object.entries(updateUserDto)
        .filter(([, value]) => value !== undefined)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      role: updateUserDto.roleId
        ? { connect: { id: updateUserDto.roleId } }
        : undefined,
    };

    return this.prisma.users.update({
      data: updateData,
      where: { id },
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

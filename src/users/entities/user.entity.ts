import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserDto> {
    const {name, email, password, phonenumber, gender, role, address} = data;
    
    const res = await this.prisma.users.create({
      data: {
        name,
        email,
        password,
        address,
        gender,
        role: {
          connect: {
            role,
          }
        },
        phonenumber,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phonenumber: true,
        address: true,
        role: {
          select: {
            id: true,
            role: true,
          }
        },
        gender: true,
      }
    })

    return res;
  }

  async findAll(): Promise<UserDto[]> {
    const res = await this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phonenumber: true,
        address: true,
        role: {
          select: {
            id: true,
            role: true,
          }
        },
        gender: true,
      }
    })
    return res;
  }

  async findOne(id: number): Promise<UserDto> {
    const res = await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phonenumber: true,
        address: true,
        gender: true,
        role: {
          select: {
            id: true,
            role: true,
          }
        }
      },
    });
    
    return res;
  }


  async update(id: number, data: UpdateUserDto): Promise<UserDto> {
    const res = await this.prisma.users.update({
      data,
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        phonenumber: true,
        address: true,
        gender: true,
        role: {
          select: {
            id: true,
            role: true,
          }
        }
      },
    });
    
    return res;
  }

  async delete(id: number): Promise<UserDto> {
    const res = await this.prisma.users.delete({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        phonenumber: true,
        address: true,
        gender: true,
        role: {
          select: {
            id: true,
            role: true,
          }
        }
      },
    });

    return res;
  }

  async findOneByEmail(email: string): Promise<UserDto | null> {
    const res = await this.prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phonenumber: true,
        address: true,
        gender: true,
        role: {
          select: {
            id: true,
            role: true,
          }
        },
        password: true,
      },
    });

    return res;
  }
}
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersRepository } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<UserDto[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<UserDto | null> {
    return this.usersRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<UserDto | null> {
    return this.usersRepository.findOneByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto | null> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<UserDto> {
    return this.usersRepository.delete(id);
  }
}

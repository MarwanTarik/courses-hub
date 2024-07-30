import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLevelDto } from '../dto/create-level.dto';
import { UpdateLevelDto } from '../dto/update-level.dto';
import { LevelDto } from '../dto/level.dto';

@Injectable()
export class LevelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLevelDto): Promise<LevelDto> {
    return this.prisma.levels.create({ data });
  }

  async findAll(): Promise<LevelDto[]> {
    return this.prisma.levels.findMany();
  }

  async findOne(id: number): Promise<LevelDto> {
    return this.prisma.levels.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateLevelDto): Promise<LevelDto> {
    return this.prisma.levels.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<LevelDto> {
    return this.prisma.levels.delete({ where: { id } });
  }
}

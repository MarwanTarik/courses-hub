import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { LevelRepository } from './entities/level.entity';

@Injectable()
export class LevelsService {
  constructor(private readonly levelRepository: LevelRepository) {}

  create(createLevelDto: CreateLevelDto) {
    return this.levelRepository.create(createLevelDto);
  }

  findAll() {
    return this.levelRepository.findAll();
  }

  findOne(id: number) {
    return this.levelRepository.findOne(id);
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return this.levelRepository.update(id, updateLevelDto);
  }

  remove(id: number) {
    return this.levelRepository.delete(id);
  }
}

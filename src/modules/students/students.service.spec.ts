import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { StudentsRepository } from './entities/student.entity';
import { StudentDto } from './dto/student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

describe('StudentsService', () => {
  let service: StudentsService;
  let repository: StudentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: StudentsRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repository = module.get<StudentsRepository>(StudentsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result: StudentDto[] = [];
      jest.spyOn(repository, 'findAll').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single student', async () => {
      const result = {} as StudentDto;
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);
      const id = 1;
      expect(await service.findOne(id)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const student = {} as CreateStudentDto;
      const result = {} as StudentDto;
      jest.spyOn(repository, 'create').mockResolvedValue(result);
      expect(await service.create(student)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const dto = {} as UpdateStudentDto;
      const result = {} as StudentDto;
      jest.spyOn(repository, 'update').mockResolvedValue(result);
      expect(await service.update(1, dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a student', async () => {
      const result = {} as StudentDto;
      const id = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue(result);
      expect(await service.remove(id)).toBe(result);
    });
  });
});

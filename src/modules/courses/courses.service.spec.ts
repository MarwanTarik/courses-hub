import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { CoursesRepository } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseDto } from './dto/courses.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let repository: CoursesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: CoursesRepository,
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

    service = module.get<CoursesService>(CoursesService);
    repository = module.get<CoursesRepository>(CoursesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const result: CourseDto[] = [];
      jest.spyOn(repository, 'findAll').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single course', async () => {
      const result: CourseDto = {} as CourseDto;
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const dto: CreateCourseDto = {
        name: 'New Course',
        code: 'NEW',
        creditHours: 3,
        departmentId: 1,
      };
      const result: CourseDto = {} as CourseDto;
      jest.spyOn(repository, 'create').mockResolvedValue(result);
      expect(await service.create(dto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const dto: UpdateCourseDto = {} as UpdateCourseDto;

      const result: CourseDto = {} as CourseDto;
      jest.spyOn(repository, 'update').mockResolvedValue(result);

      expect(await service.update(1, dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a course', async () => {
      const result: CourseDto = {} as CourseDto;
      jest.spyOn(repository, 'delete').mockResolvedValue(result);
      expect(await service.remove(1)).toBe(result);
    });
  });
});

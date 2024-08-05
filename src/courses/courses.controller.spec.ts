import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseDto } from './dto/courses.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const result: CourseDto[] = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single course', async () => {
      const result: CourseDto = {} as CourseDto;
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      const id = '1';
      expect(await controller.findOne(id)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const dto: CreateCourseDto = {
        name: 'Course',
        code: 'COURSE',
        creditHours: 3,
        departmentId: 1,
      };
      const result: CourseDto = {} as CourseDto;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const dto: UpdateCourseDto = {};
      const result: CourseDto = {} as CourseDto;
      jest.spyOn(service, 'update').mockResolvedValue(result);

      const id = '1';
      expect(await controller.update(id, dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a course', async () => {
      const result: CourseDto = {} as CourseDto;
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      const id = '1';
      expect(await controller.remove(id)).toBe(result);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
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

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result = [] as StudentDto[];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single student', async () => {
      const result = {} as StudentDto;
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const student = {} as CreateStudentDto;
      const result = {} as StudentDto;
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create(student)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const dto = {} as UpdateStudentDto;
      const result = {} as StudentDto;
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await controller.update('1', dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a student', async () => {
      const result = {} as StudentDto;
      const id = 'id';
      jest.spyOn(service, 'remove').mockResolvedValue(result);
      expect(await controller.remove(id)).toBe(result);
    });
  });
});

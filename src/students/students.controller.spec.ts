import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import {
  Students,
  Prisma,
  Level,
  Department,
  Role,
  Gender,
} from '@prisma/client';

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
      const result: Students[] = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single student', async () => {
      const result: Students = {} as Students;
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const student: Prisma.StudentsCreateInput = {
        studentId: '1',
        gpa: new Prisma.Decimal(3.5),
        level: Level.first as Prisma.LevelsCreateNestedOneWithoutStudentsInput,
        department:
          Department.CS as Prisma.DepartmentsCreateNestedOneWithoutStudentsInput,
        user: {
          name: 'Student',
          phonenumber: '080123',
          email: 'std@gmail.com',
          password: 'password',
          role: Role.student,
          address: '123, Student Street',
          gender: Gender.male,
        } as Prisma.UsersCreateNestedOneWithoutStudentInput,
      };

      const result: Students = {
        departmentId: 1,
        gpa: student.gpa as Prisma.Decimal,
        levelId: 1,
        studentId: '1',
        userId: 1,
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(student)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const dto: Prisma.StudentsUpdateInput = {
        department:
          Department.CS as Prisma.DepartmentsCreateNestedOneWithoutStudentsInput,
      };

      const result: Students = {
        departmentId: 1,
        gpa: new Prisma.Decimal(3.5),
        levelId: 1,
        studentId: '1',
        userId: 1,
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a student', async () => {
      const result: Students = {
        departmentId: 1,
        gpa: new Prisma.Decimal(3.5),
        levelId: 1,
        studentId: '1',
        userId: 1,
      };
      const id = 'id';

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toBe(result);
    });
  });
});

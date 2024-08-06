import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { StudentsRepository } from '././entities/student.entity';
import { Department, Level, Prisma, Role, Gender } from '@prisma/client';
import { Students } from '@prisma/client';

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
      const result: Students[] = [];
      jest.spyOn(repository, 'findAll').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single student', async () => {
      const result: Students = {} as Students;
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);
      const id = 1;
      expect(await service.findOne(id)).toBe(result);
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
      jest.spyOn(repository, 'create').mockResolvedValue(result);

      expect(await service.create(student)).toBe(result);
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
      jest.spyOn(repository, 'update').mockResolvedValue(result);
      expect(await service.update(1, dto)).toBe(result);
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
      const id = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue(result);
      expect(await service.remove(id)).toBe(result);
    });
  });
});

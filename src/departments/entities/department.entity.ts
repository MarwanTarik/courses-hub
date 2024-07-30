import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { DepartmentDto } from '../dto/department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';

export class DepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDepartmentDto): Promise<DepartmentDto> {
    const department = await this.prisma.departments.create({
      data: {
        department: data.department,
      },
      select: {
        department: true,
      },
    });

    return department;
  }

  async findAll(): Promise<DepartmentDto[]> {
    const departments = await this.prisma.departments.findMany({
      select: {
        department: true,
      },
    });

    return departments;
  }

  async findOne(id: number): Promise<DepartmentDto> {
    const department = await this.prisma.departments.findUnique({
      where: {
        id: id,
      },
      select: {
        department: true,
      },
    });

    return department;
  }

  async update(id: number, data: UpdateDepartmentDto): Promise<DepartmentDto> {
    const department = await this.prisma.departments.update({
      where: {
        id: id,
      },
      data: {
        department: data.department,
      },
      select: {
        department: true,
      },
    });

    return department;
  }

  async delete(id: number): Promise<DepartmentDto> {
    const department = await this.prisma.departments.delete({
      where: {
        id: id,
      },
      select: {
        department: true,
      },
    });
    return department;
  }
}

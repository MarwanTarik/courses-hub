import { Level, PrismaClient, Role } from '@prisma/client';
import { Department } from '../enums/department.enum';

class Seed {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.seedRoles();
    this.seedLevels();
    this.seedDepartments();
  }

  async seedRoles() {
    try {
      await this.prisma.roles.createMany({
        data: [
          { role: Role.student },
          { role: Role.guest },
          { role: Role.admin },
        ],
      });
      console.log('Seed roles inserted successfully.');
    } catch (error) {
      console.error('Error seeding roles:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async seedLevels() {
    try {
      await this.prisma.levels.createMany({
        data: [
          { level: Level.first },
          { level: Level.second },
          { level: Level.third },
          { level: Level.fourth },
        ],
      });
      console.log('Seed levels inserted successfully.');
    } catch (error) {
      console.error('Error seeding levels:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async seedDepartments() {
    try {
      await this.prisma.departments.createMany({
        data: [
          { department: Department.CS },
          { department: Department.AI },
          { department: Department.IS },
          { department: Department.IT },
        ],
      });
      console.log('Seed departments inserted successfully.');
    } catch (error) {
      console.error('Error seeding departments:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

new Seed();

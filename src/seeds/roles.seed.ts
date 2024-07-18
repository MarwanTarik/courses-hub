import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRoles() {
  try {
    await prisma.roles.createMany({
      data: [{ role: 'admin' }, { role: 'guest' }, { role: 'student' }],
    });
    console.log('Seed roles inserted successfully.');
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}
seedRoles();

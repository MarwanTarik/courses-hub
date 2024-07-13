import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRoles() {
  try {
    await prisma.roles.createMany({
      data: [
        {role: 'ADMIN'},
        {role: 'GUEST'},
        {role: 'STUDENT'}
      ],
    });
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding rules:', error);
  } finally {
    await prisma.$disconnect();
  }
}
seedRoles();

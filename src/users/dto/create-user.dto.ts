import { Gender, Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UsersCreateInput {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  address: string;
  gender: Gender;
  student?: Prisma.StudentsCreateNestedOneWithoutUserInput;
  role: Prisma.RolesCreateNestedOneWithoutUsersInput;
}

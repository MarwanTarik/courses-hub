import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Users } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccessTokenPayload } from 'src/types/access-token-paylod.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.userService.findOneByEmail(email);
    if (user === null) {
      throw new BadRequestException('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(email: string, password: string): Promise<AccessTokenPayload> {
    const paylod = { email, password };
    return { access_token: this.jwtService.sign(paylod) };
  }

  async register(user: CreateUserDto): Promise<AccessTokenPayload> {
    const existingUser = this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exist');
    }

    const hashedPassword = bcrypt.hashSync(user.password, this.configService.getOrThrow('PASSWORD_SALT'));
    const newUser = { ...user, password: hashedPassword };
    
    this.userService.create(newUser);

    return this.login(newUser.email, newUser.password);
  }
}

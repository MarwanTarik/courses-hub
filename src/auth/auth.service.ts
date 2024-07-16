import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayload } from 'src/types/access-token-paylod.type';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.userService.findOneByEmail(email);

    if (user === null) {
      throw new BadRequestException('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(email: string, password: string): Promise<AccessTokenPayload> {
    const paylod = { email, password };
    return { access_token: this.jwtService.sign(paylod) };
  }

  async register(user: RegisterUserDto): Promise<AccessTokenPayload> {
    const existingUser = await this.userService.findOneByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException('email already exist');
    }

    const hashedPassword = bcrypt.hashSync(
      user.password,
      parseInt(this.configService.getOrThrow('PASSWORD_SALT'), 10),
    );
    const newUser = { ...user, password: hashedPassword };

    await this.userService.create(newUser);

    return this.login(newUser.email, newUser.password);
  }
}

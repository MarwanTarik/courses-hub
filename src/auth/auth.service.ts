import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayload } from './dto/access-token-paylod.dto';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<UserDto> {
    const { email, password, role } = loginDto;
    const user = await this.userService.findOneByEmail(email);

    if (user === null) {
      throw new BadRequestException('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    if (!user.role || user.role.role !== role) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(loginDto: LoginDto): Promise<AccessTokenPayload> {
    return { access_token: this.jwtService.sign(loginDto) };
  }

  async register(user: RegisterDto): Promise<AccessTokenPayload> {
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

    const loginDto: LoginDto = {
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    };
    return this.login(loginDto);
  }
}

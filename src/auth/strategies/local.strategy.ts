import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserDto } from '../../users/dto/user.dto';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    email: string,
    password: string,
  ): Promise<UserDto> {
    const { role } = req.body;
    const user = await this.authService.validateUser(email, password, role);
    if (user === null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('authentication')
@Public()
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Invalid credentials',
    type: UnauthorizedException,
  })
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const { email, password, role }: LoginDto = req.user;
    return await this.authService.login({ email, password, role });
  }

  @ApiBody({ type: RegisterDto })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Invalid credentials',
    type: UnauthorizedException,
  })
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.authService.register(user);
  }
}

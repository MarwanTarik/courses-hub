import {
  Controller,
  Request,
  Post,
  UseGuards,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenPayload } from 'src/types/access-token-paylod.type';
import { Public } from 'src/decorators/public.decorator';
import { RegisterUserDto } from './dto/register-user.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req,
  ): Promise<AccessTokenPayload | BadRequestException> {
    const { email, password, role } = req.user;
    return this.authService.login(email, password, role);
  }

  @Post('register')
  async register(
    @Body() user: RegisterUserDto,
  ): Promise<AccessTokenPayload | BadRequestException> {
    return await this.authService.register(user);
  }
}

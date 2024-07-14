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
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req,
  ): Promise<AccessTokenPayload | BadRequestException> {
    const { email, password } = req.user;
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(
    @Body() user: CreateUserDto,
  ): Promise<AccessTokenPayload | BadRequestException> {
    return await this.authService.register(user);
  }
}

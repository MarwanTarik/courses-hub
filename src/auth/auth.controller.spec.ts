import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';
import { AccessTokenPayload } from './dto/access-token-paylod.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password',
        role: Role.student,
      };

      const token: AccessTokenPayload = { access_token: 'token' };

      jest.spyOn(authService, 'login').mockResolvedValue(token);

      const request: Request = { user: loginDto } as unknown as Request;
      expect(await controller.login(request)).toBe(token);
    });
  });

  describe('register', () => {
    it('should create a user and return the access token', async () => {
      const registerDto: RegisterDto = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'hashedpassword',
        phonenumber: '1234567890',
        address: '123 Main Street',
        gender: Gender.male,
        role: Role.student,
      };

      const token: AccessTokenPayload = { access_token: 'token' };

      jest.spyOn(authService, 'register').mockResolvedValue(token);
      expect(await controller.register(registerDto)).toBe(token);
    });
  });
});

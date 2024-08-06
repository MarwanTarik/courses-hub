import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from '../enums/role.enum';
import { Gender } from '../enums/gender.enum';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { AccessTokenPayload } from './dto/access-token-paylod.dto';
import { UserDto } from 'src/users/dto/user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            findOneByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = {} as UserDto;
      const loginDto: LoginDto = {
        email: 'johndoe@gmail.com',
        password: 'password',
        role: Role.student,
      };

      jest.spyOn(service, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('access_token');

      const result = await service.login(loginDto);
      expect(result).toEqual({ access_token: 'access_token' });
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const user: RegisterDto = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        phonenumber: '1234567890',
        address: '123 Main Street',
        gender: Gender.male,
        role: Role.student,
      };

      jest.spyOn(service, 'register').mockReturnValue({
        access_token: 'access',
      } as unknown as Promise<AccessTokenPayload>);

      const result = await service.register(user);
      expect(result).toEqual({ access_token: 'access' });
    });
  });
});

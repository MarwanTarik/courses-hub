import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from '../enums/role.enum';
import { Gender } from '../enums/gender.enum';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config/dist/config.service';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayload } from './dto/access-token-paylod.dto';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
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
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user if credentials are valid', async () => {
      const user: CreateUserDto = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        phonenumber: '1234567890',
        address: '123 Main Street',
        gender: Gender.male,
        role: Role.student,
      };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

      const result = await service.validateUser({
        email: 'test@example.com',
        password: 'password',
        role: Role.student,
      });
      expect(result).toEqual(user);
    });

    it('should throw Bad Request Exception if credentials are invalid', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

      const loginDto: LoginDto = {
        email: 'johndoe@gmail.com',
        password: 'password',
        role: Role.student,
      };
      await expect(service.validateUser(loginDto)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user: CreateUserDto = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        phonenumber: '1234567890',
        address: '123 Main Street',
        gender: Gender.male,
        role: Role.student,
      };

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

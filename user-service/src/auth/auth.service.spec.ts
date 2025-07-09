import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return user if valid', async () => {
      const password = 'securePassword';
      const hashedPassword = await bcrypt.hash(password, 10);
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
        name: 'Test',
        country: null,
        city: null,
      };

      usersService.findByEmail.mockResolvedValue(mockUser);

      const result = await service.validateUser('test@tset.com', password);
      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: 'Test',
        country: null,
        city: null,
      });
    });

    it('should return null if user is not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      const result = await service.validateUser('test1@test.com', 'password');
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const hashedPassword = await bcrypt.hash('correct-password', 10);
      usersService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
        name: 'Test',
      });

      const result = await service.validateUser('test@test.com', 'wrong-password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const user = { id: 1, email: 'test@example.com' };
      jwtService.sign.mockReturnValue('mocked_token');

      const result = await service.login(user);
      expect(result).toBe('mocked_token');
      expect(jwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
    });
  });

  describe('register', () => {
    it('should create a user with hashed password', async () => {
      const email = 'test@test.com';
      const password = 'password';
      usersService.create.mockResolvedValue({
        id: 1,
        email: email,
        password: 'hashed',
        name: null,
        country: null,
        city: null,
      });

      const result = await service.register(email, password);

      expect(usersService.create).toHaveBeenCalledWith({
        email: email,
        password: expect.any(String),
        name: null,
        country: null,
        city: null,
      });
      expect(result).toEqual({
        id: 1,
        email: email,
        password: 'hashed',
        name: null,
        country: null,
        city: null,
      });
    });
  });
});

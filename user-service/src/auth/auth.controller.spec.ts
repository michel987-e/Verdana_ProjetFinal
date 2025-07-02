import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<Record<keyof AuthService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    authService = {
      register: jest.fn(),
      validateUser: jest.fn(),
      login: jest.fn(),
    };

    jwtService = {
      verify: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    it('should register a user and return a message', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      authService.register.mockResolvedValue(mockUser);

      const result = await controller.register({ email: 'test@example.com', password: 'secure' });
      expect(result).toEqual({ message: 'Utilisateur enregistré', user: mockUser });
      expect(authService.register).toHaveBeenCalledWith('test@example.com', 'secure');
    });
  });

  describe('login', () => {
    it('should return error if invalid', async () => {
      authService.validateUser.mockResolvedValue(null);
      const res = {} as Response;
      res.cookie = jest.fn();

      const result = await controller.login({ email: 'bad@example.com', password: 'wrong' }, res);
      expect(result).toEqual({ error: 'Identifiants incorrects' });
      expect(authService.validateUser).toHaveBeenCalledWith('bad@example.com', 'wrong');
    });

    it('should return message and set cookie if valid', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      authService.validateUser.mockResolvedValue(mockUser);
      authService.login.mockResolvedValue('jwt_token');

      const res = { cookie: jest.fn() } as any;

      const result = await controller.login({ email: 'test@example.com', password: 'pass' }, res);

      expect(result).toEqual({ message: 'Connected' });
      expect(res.cookie).toHaveBeenCalledWith('auth_token', 'jwt_token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
      });
    });
  });

  describe('logout', () => {
    it('should clear the cookie and return a message', () => {
      const res = { clearCookie: jest.fn() } as any;

      const result = controller.logout(res);

      expect(res.clearCookie).toHaveBeenCalledWith('auth_token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
      });
      expect(result).toEqual({ message: 'Deconnected' });
    });
  });

  describe('validate', () => {
    it('should return unauthorized if token is missing', async () => {
      const req = { cookies: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await controller.validate(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token missing' });
    });

    it('should return valid if token is valid', async () => {
      const req = { cookies: { auth_token: 'valid_token' } } as unknown as Request;
      const res = {} as any;
      const payload = { sub: 1, email: 'test@example.com' };
      jwtService.verify.mockReturnValue(payload);

      const result = await controller.validate(req, res);
      expect(result).toEqual({ valid: true, payload });
      expect(jwtService.verify).toHaveBeenCalledWith('valid_token');
    });

    it('should return unauthorized if token is invalid', async () => {
      const req = { cookies: { auth_token: 'valid_token' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      jwtService.verify.mockImplementation(() => { throw new Error('Invalid token') });

      await controller.validate(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: new Error('Invalid token') });
    });
  });
});

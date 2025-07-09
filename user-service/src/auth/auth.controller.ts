import { Controller, Post, Body, HttpCode, HttpStatus, Res, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('users/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: { email: string, password: string }) {
    const user = await this.authService.register(body.email, body.password);
    return { message: 'Utilisateur enregistré', user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { email: string, password: string },
    @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { error: 'Identifiants incorrects' };
    }

    const token = await this.authService.login(user);
    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false
    })
    return {message: 'Connected', token: token}
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
    });
    return {message: 'Deconnected'}
  }

  @Get('validate')
  @HttpCode(HttpStatus.OK)
  async validate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies['auth_token'];
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({error: 'Token missing'})
    }

    try {
      const payload = this.jwtService.verify(token);
      return {valid: true, payload};
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({error: err})
    }
  }
}

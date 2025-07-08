import { Controller, Post, Body, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { RegisterTokenDto } from './dto/register-token.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post('register-token')
  register(@Body() dto: RegisterTokenDto) {
    this.service.registerToken(dto.token);
    return { message: 'Token enregistré ' };
  }

  @Post('send-test')
  async sendTest(@Body() dto: RegisterTokenDto) {
    await this.service.sendToToken(dto.token, 'Test', 'Ceci est un test.');
    return { message: 'Notification envoyée ' };
  }

  @Get('tokens')
  getAll() {
    return this.service.getAllTokens();
  }
}

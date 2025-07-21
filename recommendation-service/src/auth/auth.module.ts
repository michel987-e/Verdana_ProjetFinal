import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'dev_secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [JwtAuthGuard],
    exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}

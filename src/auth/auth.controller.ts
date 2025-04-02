import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registrateUser(@Body('email') email: string) {
    return await this.authService.sendmagicLink(email);
  }

  @Get('verify-magic-link')
  async verifyMagicLink(@Query('token') token: string) {
    return await this.authService.verifyMagicLink(token);
  }

  @Get('profile')
  async getMyProfile(@Body('token') token: string) {
    return await this.authService.getYourProfile(token);
  }
}

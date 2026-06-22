import { Body, Controller, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

interface LoginDto {
  email: string;
  password: string;
}

interface PasswordResetRequestDto {
  email: string;
}

interface PasswordResetDto {
  password: string;
  token: string;
}

interface CookieRequest extends Request {
  cookies: {
    auth_token?: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(body, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Post('password-reset/request')
  requestPasswordReset(@Body() body: PasswordResetRequestDto) {
    return this.authService.requestPasswordReset(body);
  }

  @Post('password-reset/confirm')
  resetPassword(@Body() body: PasswordResetDto) {
    return this.authService.resetPassword(body);
  }

  @Post('verifyUser/:role')
  verifyUser(@Req() req: CookieRequest, @Param('role') role: string) {
    return this.authService.verifyUser(req.cookies.auth_token, role);
  }
}

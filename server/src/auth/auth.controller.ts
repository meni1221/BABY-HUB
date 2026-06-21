import { Body, Controller, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

interface LoginDto {
  email: string;
  password: string;
}

interface CookieRequest extends Request {
  cookies: {
    auth_token?: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/babysitter')
  loginBabysitter(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginBabysitter(body, res);
  }

  @Post('login/parent')
  loginParent(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginParent(body, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Post('verifyUser/:role')
  verifyUser(@Req() req: CookieRequest, @Param('role') role: string) {
    return this.authService.verifyUser(req.cookies.auth_token, role);
  }
}

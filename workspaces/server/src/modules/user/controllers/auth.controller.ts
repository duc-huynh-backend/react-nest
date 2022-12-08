import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Next,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { API_PREFIX } from '@/src/core/configs/envs';
import { BaseController } from '@/src/core/controller/base.controller';
import { AuthGuard } from '@/src/core/guards/auth/auth.guard';
import { LoginDTO } from '../dto/login.dto';
import { UserService } from '../services/user.service';

@Controller(`${API_PREFIX}/auth`)
export class AuthController extends BaseController {
  constructor(
    @Inject(UserService.name)
    private readonly userService: UserService,
  ) {
    super();
  }

  @Post('/token')
  @HttpCode(200)
  // @UseGuards(AuthGuard)
  async getAccesstoken(@Body() body: LoginDTO, @Res() res, @Req() req) {
    const { mail_address, user_password } = body;

    const accessToken = await this.userService.getAccessToken(mail_address, user_password);

    res.cookie('accessToken', accessToken, { path: '/' });

    return res.json({ accessToken });
  }

  @Get('/logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req, @Res() res, @Next() next) {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.clearCookie('accessToken');
      res.redirect('/login');
    });
  }
}

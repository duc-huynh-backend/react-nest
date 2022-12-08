import { SearchDTO } from './../dto/search.dto';
import { API_PREFIX } from '@/src/core/configs/envs';
import { BaseController } from '@/src/core/controller/base.controller';
import { AuthGuard } from '@/src/core/guards/auth/auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Res,
  Req,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create.dto';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update.dto';
import { DELETE_FLG } from '@/src/utils/contants';

@Controller(`${API_PREFIX}/users`)
export class UsersController extends BaseController {
  constructor(
    @Inject(UserService.name)
    private readonly userService: UserService,
  ) {
    super();
  }

  @Get('/:id')
  async findUser(@Res() res, @Param('id') id) {
    try {
      const user = await this.userService.findUserById(id);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(Number(error.response.statusCode)).json(error);
    }
  }

  @Get('/')
  async findUsers(@Res() res, @Query() query: SearchDTO) {
    try {
      const { count, rows } = await this.userService.findUsers(query);
      return res.status(HttpStatus.OK).json({ users: rows, totalUsers: count });
    } catch (error) {
      return res.status(Number(error.response.statusCode)).json(error);
    }
  }

  @Post('/')
  @UseGuards(AuthGuard)
  async createUser(@Body() body: CreateUserDto, @Req() req) {
    const {
      authority, user_name, user_password, mail_address,
    } = body;

    const { user: { userId: currentUserId } } = req;

    const newUser = await this.userService.createUser({
      user_name,
      user_password,
      authority,
      mail_address,
    }, currentUserId);

    return newUser;
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id, @Body() body: UpdateUserDto, @Req() req) {
    const {
      authority, user_name, user_password, mail_address,
    } = body;

    const { user: { userId: currentUserId } } = req;

    const isUpdated = await this.userService.updateUserById(id, {
      user_name,
      user_password,
      authority,
      mail_address,
    }, currentUserId);

    return { isUpdated };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id, @Req() req) {
    const { user: { userId: currentUserId } } = req;

    const isDeleted = await this.userService.updateUserById(id, { delete_flg: DELETE_FLG.YES }, currentUserId);

    return { isDeleted };
  }
}

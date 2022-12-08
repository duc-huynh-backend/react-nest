import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { API_PREFIX } from '@/src/core/configs/envs';
import { BaseController } from '@/src/core/controller/base.controller';

@Controller(`${API_PREFIX}`)
export class ApiExceptionController extends BaseController {
  @Get('*')
  @HttpCode(404)
  async apiNotFound() {
    throw new NotFoundException();
  }
}

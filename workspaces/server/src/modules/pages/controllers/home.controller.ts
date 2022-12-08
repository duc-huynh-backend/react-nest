import { readFileSync } from 'fs';
import { resolve } from 'path';

import {
  Controller, Get, Header, HttpCode,
} from '@nestjs/common';

@Controller('')
export class HomeController {
  private readonly htmlPath: string = resolve(
    process.cwd(),
    '..',
    '..',
    'dist',
    'public',
    'index.html',
  );

  private readonly html: string;

  constructor() {
    this.html = readFileSync(this.htmlPath, 'utf-8');
  }

  @Get('*')
  @HttpCode(200)
  @Header('Content-Type', 'text/html')
  home() {
    return this.html;
  }
}

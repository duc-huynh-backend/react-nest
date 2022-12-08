import { Global, Module } from '@nestjs/common';

import { HomeController } from './controllers/home.controller';

@Global()
@Module({
  imports: [],
  controllers: [HomeController],
  providers: [],
})
export class PageModule {}

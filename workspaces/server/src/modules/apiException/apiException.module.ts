import { ApiExceptionController } from './controllers/apiException.controller';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  controllers: [ApiExceptionController],
  providers: [],
})
export class ApiException {}

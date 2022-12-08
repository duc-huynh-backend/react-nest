import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { LoggerService } from '../core/providers/logger';
import { SequelizeModule } from '../database/sequelize.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT__PRIVATE_KEY, JWT__PUBLIC_KEY } from '../core/configs/envs';
import { PassportModule } from '@nestjs/passport';
import { BearerJwtStrategy } from '../core/providers/bearerJwt';
import { ApiException } from './apiException/apiException.module';

@Global()
@Module({
  imports: [
    SequelizeModule,
    UserModule,
    ApiException,
    PassportModule.register({ session: true }),
    JwtModule.register({
      privateKey: JWT__PRIVATE_KEY,
      publicKey: JWT__PUBLIC_KEY,
      signOptions: { expiresIn: '60' },
    }),
  ],
  controllers: [],
  providers: [
    LoggerService,
    BearerJwtStrategy,
  ],
  exports: [LoggerService],
})
export class ApisModule { }

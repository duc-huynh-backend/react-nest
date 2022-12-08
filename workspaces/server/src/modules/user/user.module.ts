import { AuthService } from '@/src/core/services/auth.service';
import { User } from '@/src/modules/user/entity/user.entity';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from '../user/controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repository/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [
    AuthController,
    UsersController,
  ],
  providers: [
    AuthService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: User,
    },
    {
      provide: UsersRepository.name,
      useClass: UsersRepository,
    },
    {
      provide: UserService.name,
      useClass: UserService,
    },
    JwtService,
  ],
})
export class UserModule {}

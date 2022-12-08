import { Authority } from '@/src/modules/user/types/user';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
    user_name: string;

  @IsEmail()
  @IsNotEmpty()
    mail_address: string;

  @IsString()
  @IsNotEmpty()
    user_password: string;

  @IsEnum(Authority)
    authority: Authority = Authority.MEMBER;
}

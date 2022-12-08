import { Authority } from '@/src/modules/user/types/user';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
    user_name: string;

  @IsEmail()
    mail_address: string;

  @IsString()
    user_password: string;

  @IsEnum(Authority)
    authority: Authority = Authority.MEMBER;
}

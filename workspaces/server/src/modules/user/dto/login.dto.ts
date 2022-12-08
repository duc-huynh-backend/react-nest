import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail()
    mail_address: string;

  @IsString()
    user_password: string;
}

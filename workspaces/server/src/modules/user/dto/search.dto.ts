import { IsEmail, IsNumberString } from 'class-validator';

export class SearchDTO {
  @IsEmail()
    user_name?: string;

  @IsNumberString()
    authority?: number;

  @IsNumberString()
    limit?: number;

  @IsNumberString()
    page?: number;
}

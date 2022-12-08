import { Injectable } from '@nestjs/common';
import { AuthGuard as JwtGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends JwtGuard('jwt') {}

import { JWT__PRIVATE_KEY, JWT__PUBLIC_KEY } from '@/src/core/configs/envs';
import { Inject, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { User } from '@/src/modules/user/entity/user.entity';
import { UserService } from '@/src/modules/user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly privateKey: Buffer;
  private readonly publicKey: Buffer;

  constructor(
    @Inject(UserService.name)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.privateKey = JWT__PRIVATE_KEY;
    this.publicKey = JWT__PUBLIC_KEY;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.user_password === pass) {
      const { user_password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return { accessToken: this.jwtService.sign(payload) };
  }

  signToken(payload: Partial<User>) {
    return sign(payload, this.privateKey, { algorithm: 'RS256' });
  }

  verifyToken(token: string) {
    try {
      return verify(token, this.publicKey, { algorithms: ['RS256'] });
    } catch {
      return null;
    }
  }
}

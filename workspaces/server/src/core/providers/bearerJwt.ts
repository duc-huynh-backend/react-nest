import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT__PRIVATE_KEY } from '../configs/envs';
import { AccessTokenPayload } from '@/src/modules/user/types/user';

@Injectable()
export class BearerJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromHeader('authorization'),
        ExtractJwt.fromHeader('Authorization'),
        function (req) {
          const { accessToken } = req.cookies;
          return accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT__PRIVATE_KEY,
    });
  }

  async validate(payload: AccessTokenPayload) {
    return { userId: payload.id };
  }
}

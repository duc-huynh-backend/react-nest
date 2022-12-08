import { User } from '../entity/user.entity';

export type IFindUserPayload = Partial<User>;

export type AccessTokenPayload = Pick<User, 'id'> & { iat: number };

export enum Authority {
  ADMIN = 1,
  MEMBER,
}

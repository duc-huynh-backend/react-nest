import { JWT__PUBLIC_KEY } from '@/src/core/configs/envs';
import { verify } from 'jsonwebtoken';

export function verifyToken(token: string) {
  try {
    return verify(token, JWT__PUBLIC_KEY, { algorithms: ['RS256'] });
  } catch (error) {
    console.log(error);
    return {};
  }
}

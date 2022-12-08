import { API_URL } from './../utils/constants';
import { HttpService } from './httpService';
import { ILoginPayload } from '../utils/constants';

export class AuthService extends HttpService {
  login(data: ILoginPayload) {
    return this.post(API_URL.LOGIN.PATH, data);
  }
}

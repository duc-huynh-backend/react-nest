import { HttpService } from './httpService';
import {
  IUserSearchData,
  IUserRegistrationForm,
  API_URL,
} from './../utils/constants';
import { generateSearchParamsUrlString } from 'src/utils/helpers';

export class UserService extends HttpService {
  list(searchData: IUserSearchData): Promise<any> {
    const url = generateSearchParamsUrlString(API_URL.USER.PATH, searchData);
    return this.get(url);
  }

  detail(id: string): Promise<any> {
    return this.get(`${API_URL.USER.PATH}/${id}`);
  }

  create(formData: IUserRegistrationForm): Promise<any> {
    return this.post(API_URL.USER.PATH, formData);
  }

  edit(formData: IUserRegistrationForm, id: string): Promise<any> {
    return this.put(`${API_URL.USER.PATH}/${id}`, formData);
  }

  remove(id: number): Promise<any> {
    return this.delete(`${API_URL.USER.PATH}/${id}`, {
      id,
    });
  }
}

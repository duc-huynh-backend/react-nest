import { UserService } from './userService';
import { AuthService } from './authService';

export const authService: AuthService = new AuthService();
export const userService: UserService = new UserService();

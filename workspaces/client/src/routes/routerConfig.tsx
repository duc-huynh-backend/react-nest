import { IAppRouter } from 'src/types';
import { UserList } from 'src/components/pages/User/List/List';
import { UserRegistration } from 'src/components/pages/User/Registration/Registration';
import Home from 'src/components/pages/Home';
import NotFound from 'src/components/pages/NotFound';
import Login from 'src/components/pages/Login/Login';
import { APP_URL } from 'src/utils/constants';

export const AppRoutes: IAppRouter[] = [
  {
    path: '/',
    element: <Home />,
    guard: false,
    children: [
      {
        path: APP_URL.USER.LIST.URL,
        element: <UserList />,
        guard: true,
      },
      {
        path: APP_URL.USER.NEW.URL,
        element: <UserRegistration />,
        guard: true,
      },
      {
        path: APP_URL.USER.EDIT.URL,
        element: <UserRegistration />,
        guard: true,
      },
    ],
  },
  {
    path: APP_URL.LOGIN.URL,
    element: <Login />,
    guard: false,
  },
  {
    path: APP_URL.NOT_FOUND.URL,
    element: <NotFound />,
    guard: false,
  },
];

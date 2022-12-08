import './App.scss';

import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/shared/Loading';
import {
  accessTokenSelector,
  appActions,
  appLoadingSelector,
} from './stores/reducers/appSlice';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoutes } from './routes/routerConfig';
import { Seo } from './components/shared/SEO/Seo';
import { authActions, loginStatusSelector } from './stores/reducers/authSlice';
import { IAppRouter } from './types';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  DEFAULT_APP_URL_GUARD,
} from './utils/constants';
import { cloneDeep } from 'lodash';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const [cookie] = useCookies();
  const cookieToken = cookie[ACCESS_TOKEN_COOKIE_NAME];

  const isLoading = useSelector(appLoadingSelector);
  const isLogin = useSelector(loginStatusSelector);
  const accessToken = useSelector(accessTokenSelector);

  useEffect(() => {
    // Check token in cookie storage -> If exist -> user logged in
    if (cookieToken && !accessToken) {
      dispatch(appActions.setAccessToken(cookieToken));
      dispatch(authActions.setIsLogin(true));
    }
  }, []);

  const filterRouteFunc = (route: IAppRouter) => {
    const targetRoute = route;

    if (targetRoute?.children && targetRoute.guard === DEFAULT_APP_URL_GUARD)
      targetRoute.children = targetRoute?.children.filter(
        (childRoute) => childRoute.guard === DEFAULT_APP_URL_GUARD,
      );

    return targetRoute.guard === DEFAULT_APP_URL_GUARD;
  };

  const cloneAppRoutes = cloneDeep(AppRoutes);
  const filteredAppRoutes = cloneAppRoutes.filter(filterRouteFunc);

  const router = createBrowserRouter(isLogin ? AppRoutes : filteredAppRoutes);

  return (
    <>
      <Seo />
      {isLoading && <Loading />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;

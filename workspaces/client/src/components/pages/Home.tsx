import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet /* useNavigate */, useNavigate } from 'react-router-dom';
import { loginStatusSelector } from 'src/stores/reducers/authSlice';
import { APP_URL } from 'src/utils/constants';
import { FIRST_SIDEBAR_URL } from '../layouts/SideBar/SideBar';

import ThemeLayout from '../layouts/Theme';

export default function Home(props: any) {
  const navigate = useNavigate();
  const isLogin = useSelector(loginStatusSelector);

  useEffect(() => {
    if (!isLogin) navigate(APP_URL.LOGIN.URL);

    if (isLogin && document.location.pathname === APP_URL.HOME.URL)
      navigate(FIRST_SIDEBAR_URL);
  }, [isLogin]);

  return (
    <ThemeLayout>
      <Outlet />
    </ThemeLayout>
  );
}

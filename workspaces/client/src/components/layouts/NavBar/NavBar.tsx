import './NavBar.scss';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { logout } from 'src/stores/reducers/authSlice';
import { ACCESS_TOKEN_COOKIE_NAME, APP_URL } from 'src/utils/constants';
import { appActions } from 'src/stores/reducers/appSlice';
import { useCookies } from 'react-cookie';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, , removeCookie] = useCookies();

  async function onLogout() {
    dispatch(appActions.loading(true));

    await dispatch(logout())
      .unwrap()
      .then(() => {
        removeCookie(ACCESS_TOKEN_COOKIE_NAME);
        navigate(APP_URL.LOGIN.URL);
      })
      .catch((err: any) => err)
      .finally(() => dispatch(appActions.loading(false)));
  }

  return (
    <div id='navbar-main'>
      <div className='nav-item-container'>
        <a
          data-widget='pushmenu'
          href='/'
          role='button'
          className='nav-item project-logo-link'
        >
          <img
            src='/assets/images/logo.svg'
            alt='brand logo'
            id='project-logo'
          />
        </a>
        <span className='nav-item-text project-name'>文章チェックツール</span>
      </div>
      <div className='nav-item-container'>
        <div
          data-widget='control-sidebar'
          data-slide='true'
          className='nav-item'
        >
          <span className='nav-item-text'>Keihin</span>
        </div>
        <div>
          <span
            className='nav-item logout-link'
            data-widget='control-sidebar'
            data-slide='true'
            role='button'
            onClick={onLogout}
          >
            <Icon
              icon='ion:exit-outline'
              color='rgba(0,0,0,.5)'
              className='logout-icon'
            />
            <span className='nav-item-text logout-text'>ログアウト</span>
          </span>
        </div>
      </div>
    </div>
  );
}

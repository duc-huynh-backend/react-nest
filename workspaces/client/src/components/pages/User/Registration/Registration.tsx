import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getUser,
  searchDataSelector,
  userDetailSelector,
} from '../../../../stores/reducers/userSlice';
import {
  APP_URL,
  GET_USER_ID_FROM_URL_REGEX,
  IUserDetailPayload,
  MESSAGE_BOX,
  MESSAGE_BOX_STATUS,
} from '../../../../utils/constants';
import { RegistrationForm } from './components/Form/Form';
import { first, isEmpty } from 'lodash';
import { appActions } from 'src/stores/reducers/appSlice';

const USER_NOT_FOUND_TEXT = `Id: {id} ユーザーが見つかりません。`;

export function UserRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get search form data -> Generate search page url with search params
  const searchData = useSelector(searchDataSelector);
  const searchParams = new URLSearchParams(searchData);
  const searchPageUrl = `${APP_URL.USER.LIST.URL}?${searchParams.toString()}`;

  const userId = first(
    useLocation().pathname.match(GET_USER_ID_FROM_URL_REGEX),
  );

  const pageTitle = userId
    ? APP_URL.USER.EDIT.PAGE_TITLE
    : APP_URL.USER.NEW.PAGE_TITLE;

  useEffect(() => {
    dispatch(appActions.setPageTitle(pageTitle));

    // Handle get user information
    if (userId)
      dispatch(getUser(userId))
        .unwrap()
        .catch(() =>
          navigate(searchPageUrl, {
            replace: true,
            state: {
              [MESSAGE_BOX]: {
                isMessageBoxOpen: true,
                text: USER_NOT_FOUND_TEXT.replace('{id}', userId),
                messageStatus: MESSAGE_BOX_STATUS.ERROR,
              },
            },
          }),
        );
  }, []);

  const userDetail: IUserDetailPayload = useSelector(userDetailSelector);

  return (
    <div id='user-registration-main'>
      <div id='form-container'>
        {userId ? (
          !isEmpty(userDetail) && <RegistrationForm userDetail={userDetail} />
        ) : (
          <RegistrationForm />
        )}
      </div>
    </div>
  );
}

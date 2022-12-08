import { ListIndex } from '../../../common/ListIndex/ListIndex';
import { TableList } from './components/TableList/TableList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsers,
  userListSelector,
  userActions,
} from '../../../../stores/reducers/userSlice';

import {
  APP_URL,
  IUserDetailPayload,
  MESSAGE_BOX,
} from '../../../../utils/constants';

import { SearchForm } from './components/Form/Form';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getQueryObject } from 'src/utils/helpers';
import { appActions } from 'src/stores/reducers/appSlice';

export function UserList(props: any) {
  const dispatch = useDispatch();

  const { search, state } = useLocation();

  // Get search params from url
  const searchObject = getQueryObject(search.substring(1));

  // Check message state sent from previous page
  const messageBox = state?.[MESSAGE_BOX] || {};

  const userList: Array<IUserDetailPayload> = useSelector(userListSelector);

  useEffect(() => {
    dispatch(appActions.setPageTitle(APP_URL.USER.LIST.PAGE_TITLE));

    // Display/Hide message box
    if (Object.keys(messageBox).length > 0) {
      dispatch(appActions.messageBoxDisplay(messageBox));
      window.history.replaceState({ state: null }, document.title);
    } else {
      dispatch(appActions.messageBoxDisplay({ isMessageBoxOpen: false }));
    }

    // Call API get data from server
    if (Object.keys(searchObject).length > 0)
      Promise.all([dispatch(getUsers(searchObject))]).then(() =>
        dispatch(userActions.countTotalPage()),
      );
  }, []);

  return (
    <div id='user-list-main'>
      <div id='search-form-container'>
        <SearchForm userListLength={userList?.length} />
      </div>
      {userList?.length > 0 && (
        <>
          <div id='list-index-container'>
            <ListIndex />
          </div>
          <div id='table-list-container'>
            <TableList userList={userList} />
          </div>
        </>
      )}
    </div>
  );
}

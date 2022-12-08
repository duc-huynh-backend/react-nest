import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { appActions } from 'src/stores/reducers/appSlice';
import {
  deleteUser,
  deleteUserIdSelector,
  searchDataSelector,
} from 'src/stores/reducers/userSlice';
import { APP_URL, MESSAGE_BOX, MESSAGE_BOX_STATUS } from 'src/utils/constants';
import './DeleteUserModal.scss';

export function DeleteUserModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get search form data -> Generate search page url with search params
  const searchData = useSelector(searchDataSelector);
  const searchParams = new URLSearchParams(searchData);
  const searchPageUrl = `${APP_URL.USER.LIST.URL}?${searchParams.toString()}`;

  const deleteUserId = useSelector(deleteUserIdSelector);

  const DELETE_USER_CONFIRM_TEXT = `Do you want to delete user ID ${deleteUserId}`;
  const DELETE_USER_SUCCESS_TEXT = `Delete user ID ${deleteUserId} success`;
  const DELETE_USER_FAIL_TEXT = `Delete user ID ${deleteUserId} fail`;

  const handleCloseModal = () =>
    dispatch(appActions.displayConfirmBox({ isConfirmBoxOpen: false }));

  const handleDeleteUser = async () => {
    await dispatch(deleteUser(deleteUserId))
      .unwrap()
      .then(() => {
        navigate(searchPageUrl, {
          replace: true,
          state: {
            [MESSAGE_BOX]: {
              isMessageBoxOpen: true,
              text: DELETE_USER_SUCCESS_TEXT,
              messageStatus: MESSAGE_BOX_STATUS.SUCCESS,
            },
          },
        });
      })
      .catch(() => {
        navigate(searchPageUrl, {
          replace: true,
          state: {
            [MESSAGE_BOX]: {
              isMessageBoxOpen: true,
              text: DELETE_USER_FAIL_TEXT,
              messageStatus: MESSAGE_BOX_STATUS.ERROR,
            },
          },
        });
      })
      .finally(() => handleCloseModal());
  };

  return (
    <div id='modal-main'>
      <div id='modal-title'>
        <div id='modal-close-container'>
          <Icon
            icon='heroicons:x-mark-20-solid'
            color='black'
            width={25}
            height={25}
            id='modal-close-icon'
          />
          <div
            className='modal-close-icon-click-mask'
            onClick={handleCloseModal}
          ></div>
        </div>
      </div>
      <div id='modal-body'>
        <span className='modal-message-text'>{DELETE_USER_CONFIRM_TEXT}</span>
        <div className='button-container'>
          <button
            id='close-btn'
            className='modal-button'
            type='button'
            onClick={handleCloseModal}
          >
            戻る
          </button>
          <button
            id='submit-btn'
            className='modal-button'
            type='button'
            onClick={handleDeleteUser}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}

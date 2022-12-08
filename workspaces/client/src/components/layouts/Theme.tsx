import { ReactElement, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationMessage } from '../common/NotificationMessage/NotificationMessage';
import Navbar from './NavBar/NavBar';
import { Sidebar } from './SideBar/SideBar';
import { ConfirmModal } from '../common/ConfirmModal/ConfirmModal';
import { IConfirmBoxPayload } from 'src/utils/constants';
import { modalList } from '../common/ConfirmModal/ModalList';
import {
  isMessageBoxOpenSelector,
  confirmBoxObjectSelector,
  appActions,
  pageTitleSelector,
} from 'src/stores/reducers/appSlice';

export default function ThemeLayout(props: { children: ReactElement }) {
  const dispatch = useDispatch();

  const { children: ChildrenComponent } = props;

  const pageTitle = useSelector(pageTitleSelector);

  const isMessageBoxOpen: boolean = useSelector(isMessageBoxOpenSelector);
  const confirmBoxObject: IConfirmBoxPayload = useSelector(
    confirmBoxObjectSelector,
  );

  const handleCloseModal = () =>
    dispatch(appActions.displayConfirmBox({ isConfirmBoxOpen: false }));

  const ref = useRef() as any;

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!ref.current?.contains(e.target)) handleCloseModal();
    };

    document.addEventListener('mousedown', handleClickOutside);

    if (isMessageBoxOpen)
      dispatch(appActions.messageBoxDisplay({ isMessageBoxOpen: false }));

    if (confirmBoxObject.isConfirmBoxOpen) handleCloseModal();
  }, [window.location.pathname, ref]);

  let SelectedModal = null;
  if (confirmBoxObject?.nameModal)
    SelectedModal = modalList[confirmBoxObject?.nameModal]?.component;

  return (
    <div id='main'>
      <div id='top-container'>
        <Navbar />
      </div>
      <div id='bottom-container'>
        <div id='bottom-left-container'>
          <Sidebar />
        </div>
        <div id='bottom-right-container'>
          {confirmBoxObject.isConfirmBoxOpen ? (
            <div id='modal-container'>
              <div id='modal-cover' />
              <div id='modal-inner'>
                <div ref={ref}>
                  <ConfirmModal>
                    <SelectedModal />
                  </ConfirmModal>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div id='bottom-right-inner'>
            <div id='bottom-right-header-container'>
              <span id='bottom-right-header'>{pageTitle}</span>
            </div>
            {isMessageBoxOpen ? (
              <div id='notification-message-container'>
                <NotificationMessage />
              </div>
            ) : (
              <></>
            )}
            <div id='bottom-right-body-container'>{ChildrenComponent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useSelector } from 'react-redux';
import { messageBoxObjectSelector } from '../../../stores/reducers/appSlice';
import { IMessageObject } from '../../../utils/constants';
import './NotificationMessage.scss';

export function NotificationMessage(_props: any) {
  const messageObject: IMessageObject = useSelector(messageBoxObjectSelector);

  return (
    <div className={`message-box ${messageObject.messageStatus}`}>
      {messageObject.text}
    </div>
  );
}

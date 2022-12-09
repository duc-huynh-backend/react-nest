import { useSelector } from 'react-redux';
import {
  limitSelector,
  pageSelector,
  totalUsersSelector,
  selectUserListLength,
} from '../../../stores/reducers/userSlice';
import './ListIndex.scss';

export function ListIndex(_props: any) {
  const currentUserQuantity = useSelector(selectUserListLength);
  const listLimit = useSelector(limitSelector);
  const listOffset = useSelector(pageSelector);
  const totalUsers = useSelector(totalUsersSelector);

  const startIndex = () => {
    if (currentUserQuantity === 0) return 0;
    return Number(listLimit) * (listOffset - 1) + 1;
  };

  const lastIndex = () => {
    if (currentUserQuantity === 0) return 0;
    if (currentUserQuantity < listLimit) return totalUsers;

    return Number(listLimit) * (listOffset - 1) + Number(currentUserQuantity);
  };
  return (
    <div id='list-index-main'>
      <span id='quantity-item' className='index-text'>
        {totalUsers}件中
      </span>
      <span id='item-index' className='index-text'>
        {startIndex()}～{lastIndex()}
      </span>
    </div>
  );
}

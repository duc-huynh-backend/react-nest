import './TableList.scss';

import { Pagination } from '../../../../../common/Pagination/Pagination';
import { Link } from 'react-router-dom';
import { APP_URL } from 'src/utils/constants';

export function TableList(props: any) {
  const { userList } = props;

  const renderTableList = (userList: Array<any> = []) => {
    if (userList?.length === 0)
      return (
        <tr>
          <td className='table-item' colSpan={3}>
            Empty
          </td>
        </tr>
      );

    return userList?.map((item, index) => {
      return (
        <tr key={index}>
          <td className='table-item'>
            <Link
              className='item-link'
              to={APP_URL.USER.EDIT.URL.replace(':id', item.user_id)}
            >
              {item.user_id}
            </Link>
          </td>
          <td className='table-item'>
            <Link
              className='item-link'
              to={APP_URL.USER.EDIT.URL.replace(':id', item.user_id)}
            >
              {item.user_name}
            </Link>
          </td>
          <td className='table-item'>{item.authority}</td>
        </tr>
      );
    });
  };

  return (
    <div id='table-list-main'>
      <div className='pagination-container'>
        <Pagination />
      </div>
      <div id='table-container'>
        <table id='table'>
          <thead>
            <tr id='table-header-container'>
              <th className='table-header table-header-1'>ユーザーID</th>
              <th className='table-header table-header-2'>ユーザー名</th>
              <th className='table-header table-header-3'>権限</th>
            </tr>
          </thead>
          <tbody>{renderTableList(userList)}</tbody>
        </table>
      </div>
      <div className='pagination-container'>
        <Pagination />
      </div>
    </div>
  );
}

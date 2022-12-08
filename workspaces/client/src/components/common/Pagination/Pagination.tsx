import './Pagination.scss';

import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsers,
  limitSelector,
  pageSelector,
  totalPagesSelector,
  userActions,
} from '../../../stores/reducers/userSlice';
import {
  DEFAULT_LIMIT_OPTIONS,
  DEFAULT_PAGE,
  PAGINATION_BUTTON_IDS,
} from '../../../utils/constants';
import { getQueryObject } from '../../../utils/helpers';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

export function Pagination(_props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listLimit = useSelector(limitSelector);
  const listPage = useSelector(pageSelector);
  const totalPages = useSelector(totalPagesSelector);

  const disablePrevBtn = Number(listPage) === DEFAULT_PAGE;
  const disableNextBtn = Number(listPage) === totalPages;

  const searchObject = getQueryObject(useLocation().search.substring(1));

  const renderLimitOptions = (optionArray: Array<number>) => {
    return optionArray.map((item, index) => {
      return <option key={index} value={item}>{`${item}件表示`}</option>;
    });
  };

  const renderSearchParams = (searchParams: any) => {
    navigate({
      search: `?${createSearchParams(searchParams)}`,
    });
  };

  const handleChangeLimit = (e: any) => {
    const requestObject = Object.assign(searchObject, {
      limit: e.target.value,
      page: DEFAULT_PAGE,
    });

    new Promise((resolve) => resolve(dispatch(getUsers(requestObject)))).then(
      () => {
        renderSearchParams(requestObject);
        dispatch(userActions.countTotalPage());
      },
    );
  };

  const handleChangePage = (e: any) => {
    let newPage = Number(listPage);

    if (e.target.id === PAGINATION_BUTTON_IDS.NEXT_BTN) {
      newPage = newPage + 1;
    } else if (e.target.id === PAGINATION_BUTTON_IDS.PREV_BTN) {
      newPage = newPage - 1;
    }

    if (newPage < DEFAULT_PAGE) newPage = DEFAULT_PAGE;

    const requestObject = Object.assign(searchObject, {
      page: newPage,
      limit: listLimit,
    });

    new Promise((resolve) => resolve(dispatch(getUsers(requestObject)))).then(
      () => {
        renderSearchParams(requestObject);
        dispatch(userActions.countTotalPage());
      },
    );
  };

  return (
    <div id='pagination-main'>
      <span className='pagination-text'>表示件数</span>
      <select
        id='quantity-select'
        value={listLimit}
        onChange={handleChangeLimit}
      >
        {renderLimitOptions(DEFAULT_LIMIT_OPTIONS)}
      </select>
      <div id='page-transfer-container'>
        <div className='btn-container'>
          <button
            id={PAGINATION_BUTTON_IDS.PREV_BTN}
            className='btn-cover'
            onClick={handleChangePage}
            disabled={disablePrevBtn}
          />
          <Icon
            icon='entypo:triangle-left'
            color={disablePrevBtn ? '#8080804f' : '#575656'}
            className='page-transfer-btn'
          />
        </div>
        <span className='page-number'>{listPage}</span>
        <div className='btn-container'>
          <button
            id={PAGINATION_BUTTON_IDS.NEXT_BTN}
            className='btn-cover'
            onClick={handleChangePage}
            disabled={disableNextBtn}
          />
          <Icon
            icon='entypo:triangle-right'
            color={disableNextBtn ? '#8080804f' : '#575656'}
            className='page-transfer-btn'
          />
        </div>
      </div>
    </div>
  );
}

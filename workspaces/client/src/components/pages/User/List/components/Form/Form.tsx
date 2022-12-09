import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { appActions } from 'src/stores/reducers/appSlice';
// import { appActions } from 'src/stores/reducers/appSlice';
import {
  getUsers,
  limitSelector,
  pageSelector,
  userActions,
} from 'src/stores/reducers/userSlice';
import {
  DEFAULT_USER_AUTHORITY_OPTIONS,
  MESSAGE_BOX_STATUS,
} from '../../../../../../utils/constants';
import { getQueryObject } from '../../../../../../utils/helpers';
import './Form.scss';

const EMPTY_DATA_TEXT = '検索結果がありませんでした。';

export function SearchForm(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listLimit = useSelector(limitSelector);
  const listPage = useSelector(pageSelector);

  const initValueObject = {
    user_name: '',
    authority: '',
  };

  // Formik no accept uncontrolled values (Can be undefined or defined)
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { user_name = '', authority = '' } = getQueryObject(
    useLocation().search.substring(1),
  );

  useEffect(() => {
    if (!user_name && !authority) {
      formik.resetForm({
        values: initValueObject,
      });
    } else {
      formik.setValues({ user_name, authority });
    }
  }, []);

  const renderAuthorityOptions = (
    optionArr: Array<{ name: string; value: string }>,
  ) => {
    return optionArr.map((item, index) => {
      return (
        <option key={index} value={item.value}>
          {item.name}
        </option>
      );
    });
  };

  const formik = useFormik({
    initialValues: initValueObject,
    onSubmit: (values: any) => {
      const searchParams = { limit: listLimit, page: listPage };

      Object.keys(values).forEach((kw) => {
        if (values[kw]) Object.assign(searchParams, { [kw]: values[kw] });
      });

      dispatch(getUsers(searchParams))
        .unwrap()
        .then((res: any) => {
          // Handle pagination
          dispatch(userActions.countTotalPage());

          // Handle display message box after submit event
          if (res.users?.length === 0) {
            dispatch(
              appActions.messageBoxDisplay({
                isMessageBoxOpen: true,
                text: EMPTY_DATA_TEXT,
                messageStatus: MESSAGE_BOX_STATUS.SUCCESS,
              }),
            );
          } else {
            dispatch(
              appActions.messageBoxDisplay({
                isMessageBoxOpen: false,
              }),
            );
          }
        });

      // Change search params in url
      navigate({
        search: `?${createSearchParams(searchParams)}`,
      });
    },
  });

  return (
    <div id='search-form-main'>
      <form id='search-form' onSubmit={formik.handleSubmit}>
        <input
          id='user-name'
          name='user_name'
          className='form-input'
          placeholder='ユーザー名を指定'
          onChange={formik.handleChange}
          value={formik.values.user_name}
          autoComplete='off'
        />
        <select
          id='authority'
          name='authority'
          className='form-input'
          value={formik.values.authority}
          onChange={(e) => formik.setFieldValue(e.target.name, e.target.value)}
        >
          <option value='' disabled style={{ display: 'none' }}>
            全ての権限
          </option>
          {renderAuthorityOptions(DEFAULT_USER_AUTHORITY_OPTIONS)}
        </select>
      </form>
      <div id='button-container'>
        <button
          id='reset-btn'
          className='form-button'
          type='reset'
          onClick={() => formik.resetForm()}
        >
          クリア
        </button>
        <button
          form='search-form'
          id='submit-btn'
          className='form-button'
          type='submit'
        >
          検索
        </button>
      </div>
    </div>
  );
}

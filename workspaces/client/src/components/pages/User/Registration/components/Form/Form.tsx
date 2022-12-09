import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DEFAULT_USER_AUTHORITY_OPTIONS,
  PASSWORD_DISPLAY_STATUS_ICON,
  IUserDetailPayload,
  IUserRegistrationForm,
  MESSAGE_BOX_STATUS,
  APP_URL,
  MESSAGE_BOX,
} from '../../../../../../utils/constants';
import './Form.scss';
import * as Yup from 'yup';
import {
  checkEmail,
  createUser,
  editUser,
  searchDataSelector,
  userActions,
} from 'src/stores/reducers/userSlice';
import { appActions } from 'src/stores/reducers/appSlice';
import { useNavigate } from 'react-router-dom';

const DELETE_USER_MODAL_NAME = 'deleteUserModal';
const CREATE_USER_SUCCESS_TEXT = 'Create successfully!';
const CREATE_USER_FAIL_TEXT = 'Create fail!';
const EDIT_USER_SUCCESS_TEXT = 'Edit successfully!';
const EDIT_USER_FAIL_TEXT = 'Edit fail!';
const REQUIRED_VALIDATION_TEXT = 'This field is required.';
const INCORRECT_EMAIL_TEXT = 'メールアドレスが間違っています。';
const EMAIL_EXIST_ERROR_TEXT = 'Trùng email rồi nha ba!';

export function RegistrationForm(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const FORM_FIELD_NAMES = {
    user_name: 'user_name',
    mail_address: 'mail_address',
    user_password: 'user_password',
    authority: 'authority',
  };

  const initValueObject = {
    user_name: '',
    mail_address: '',
    user_password: '',
    authority: '',
  };

  const setIsChangeFieldStatus = (status: boolean) => {
    return {
      user_name: status,
      mail_address: status,
      user_password: status,
      authority: status,
    };
  };

  const [isChangeFields, setIsChangeFields] = useState(
    setIsChangeFieldStatus(false),
  );

  const [passStatusIcon, setPassStatusIcon] = useState(
    PASSWORD_DISPLAY_STATUS_ICON['1'],
  );

  // Get search form data -> Generate search page url with search params
  const searchData = useSelector(searchDataSelector);
  const searchParams = new URLSearchParams(searchData);
  const searchPageUrl = `${APP_URL.USER.LIST.URL}?${searchParams.toString()}`;

  const userDetail: IUserDetailPayload = props?.userDetail;

  useEffect(() => {
    !userDetail
      ? formik.resetForm({ values: initValueObject })
      : formik.setValues(userDetail);
  }, [userDetail]);

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

  const handleDisplayPassword = (e?: any) => {
    if (!e) return setPassStatusIcon(PASSWORD_DISPLAY_STATUS_ICON['1']);
    const newStatus = String(Math.abs(Number(e?.target.id) - 1));
    setPassStatusIcon(PASSWORD_DISPLAY_STATUS_ICON[newStatus]);
  };

  const handleSubmitCreateUser = async (formData: IUserRegistrationForm) => {
    await dispatch(createUser(formData))
      .unwrap()
      .then(() =>
        navigate(searchPageUrl, {
          replace: true,
          state: {
            [MESSAGE_BOX]: {
              isMessageBoxOpen: true,
              text: CREATE_USER_SUCCESS_TEXT,
              messageStatus: MESSAGE_BOX_STATUS.SUCCESS,
            },
          },
        }),
      )
      .catch(() =>
        navigate(searchPageUrl, {
          replace: true,
          state: {
            [MESSAGE_BOX]: {
              isMessageBoxOpen: true,
              text: CREATE_USER_FAIL_TEXT,
              messageStatus: MESSAGE_BOX_STATUS.ERROR,
            },
          },
        }),
      );
  };

  const handleSubmitEditUser = async (
    formData: IUserRegistrationForm,
    userId: number,
  ) => {
    await dispatch(editUser({ formData, userId }))
      .unwrap()
      .then(() => {
        navigate(searchPageUrl, {
          replace: true,
          state: {
            [MESSAGE_BOX]: {
              isMessageBoxOpen: true,
              text: EDIT_USER_SUCCESS_TEXT,
              messageStatus: MESSAGE_BOX_STATUS.SUCCESS,
            },
          },
        });
      })
      .catch(() =>
        navigate(searchPageUrl, {
          replace: true,
          state: {
            [MESSAGE_BOX]: {
              isMessageBoxOpen: true,
              text: EDIT_USER_FAIL_TEXT,
              messageStatus: MESSAGE_BOX_STATUS.ERROR,
            },
          },
        }),
      );
  };

  const UserRegistrationSchema = Yup.object().shape({
    user_name: Yup.string().required(REQUIRED_VALIDATION_TEXT),
    mail_address: Yup.string()
      .email(INCORRECT_EMAIL_TEXT)
      .required(REQUIRED_VALIDATION_TEXT),
    user_password: Yup.string().required(REQUIRED_VALIDATION_TEXT),
    authority: Yup.string().required(REQUIRED_VALIDATION_TEXT),
  });

  const formik = useFormik({
    initialValues: !userDetail ? initValueObject : userDetail,
    validationSchema: UserRegistrationSchema,
    onSubmit: (values) => {
      userDetail
        ? handleSubmitEditUser(values, userDetail?.user_id)
        : handleSubmitCreateUser(values);
    },
  });

  const handleConfirmBox = () => {
    new Promise((resolve) =>
      resolve(dispatch(userActions.getDeleteUserId(userDetail?.user_id))),
    ).then(() =>
      dispatch(
        appActions.displayConfirmBox({
          isConfirmBoxOpen: true,
          nameModal: DELETE_USER_MODAL_NAME,
        }),
      ),
    );
  };

  const handleCheckEmail = (value: string) => {
    const isValid = !formik.errors.mail_address;
    if (isValid && value.trim() !== formik.initialValues.mail_address.trim())
      dispatch(checkEmail(value))
        .unwrap()
        .then((res: boolean) => {
          res &&
            formik.setFieldError(
              FORM_FIELD_NAMES.mail_address,
              EMAIL_EXIST_ERROR_TEXT,
            );
        });
  };

  return (
    <form id='form' onSubmit={formik.handleSubmit}>
      <div id='form-input-container'>
        <div id='form-input-inner'>
          <div className='form-input-card'>
            <span className='form-input-label'>ユーザー名</span>
            <label className='form-items-error-label'>
              {isChangeFields.user_name && formik.errors.user_name}
            </label>
            <input
              id='user-name'
              name={FORM_FIELD_NAMES.user_name}
              className='form-input'
              placeholder='ユーザー名を入力'
              onChange={(e) => {
                setIsChangeFields({
                  ...isChangeFields,
                  [FORM_FIELD_NAMES.user_name]: true,
                });
                formik.handleChange(e);
              }}
              value={formik.values.user_name}
              autoComplete='off'
            />
          </div>
          <div className='form-input-card'>
            <span className='form-input-label'>メールアドレス</span>
            <label className='form-items-error-label'>
              {isChangeFields.mail_address && formik.errors.mail_address}
            </label>
            <input
              id='mail_address'
              name='mail_address'
              className='form-input'
              placeholder='ユーザー名を入力'
              onChange={(e) => {
                setIsChangeFields({
                  ...isChangeFields,
                  [FORM_FIELD_NAMES.mail_address]: true,
                });
                formik.handleChange(e);
              }}
              onBlur={(e) => handleCheckEmail(e.currentTarget.value)}
              value={formik.values.mail_address}
              autoComplete='off'
            />
          </div>
          <div className='form-input-card'>
            <span className='form-input-label'>パスワード</span>
            <label className='form-items-error-label'>
              {isChangeFields.user_password && formik.errors.user_password}
            </label>
            <div className='form-input-wrapper'>
              <input
                id='user_password'
                name='user_password'
                type={
                  passStatusIcon.value ===
                  PASSWORD_DISPLAY_STATUS_ICON['1'].value
                    ? 'password'
                    : 'text'
                }
                className='form-input'
                placeholder='ユーザー名を入力'
                onChange={(e) => {
                  setIsChangeFields({
                    ...isChangeFields,
                    [FORM_FIELD_NAMES.user_password]: true,
                  });
                  formik.handleChange(e);
                }}
                value={formik.values.user_password}
                autoComplete='on'
              />
              <div className='display-password-btn-container'>
                <button
                  id={passStatusIcon.value}
                  className='display-password-btn-cover'
                  onClick={handleDisplayPassword}
                  type='button'
                />
                <Icon
                  icon={passStatusIcon.name}
                  color='#b0b0b0'
                  className='display-password-btn'
                  type='button'
                />
              </div>
            </div>
          </div>
          <div className='form-input-card'>
            <span className='form-input-label'>権限</span>
            <label className='form-items-error-label'>
              {isChangeFields.authority && formik.errors.authority}
            </label>
            <select
              id='authority'
              name='authority'
              className='form-input'
              value={formik.values.authority}
              onChange={(e) => {
                setIsChangeFields({
                  ...isChangeFields,
                  [FORM_FIELD_NAMES.authority]: true,
                });
                formik.setFieldValue(e.target.name, e.target.value);
              }}
            >
              <option value='' disabled style={{ display: 'none' }}>
                権限
              </option>
              {renderAuthorityOptions(DEFAULT_USER_AUTHORITY_OPTIONS)}
            </select>
          </div>
        </div>
      </div>
      <div id='button-container'>
        <button
          id='submit-btn'
          className='form-button'
          type='submit'
          onMouseDown={() => setIsChangeFields(setIsChangeFieldStatus(true))}
        >
          検索
        </button>
        {userDetail && (
          <button
            id='delete-btn'
            className='form-button'
            type='button'
            onClick={handleConfirmBox}
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
}

import './Login.scss';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { LOGIN_FORM_FIELD_LABEL, PROJECT_NAME } from '../../../utils/constants';
import { appActions } from 'src/stores/reducers/appSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  login,
  loginStatusSelector,
  showErrorMessageSelector,
} from 'src/stores/reducers/authSlice';
import { FIRST_SIDEBAR_URL } from 'src/components/layouts/SideBar/SideBar';
import { useState } from 'react';

const REQUIRED_VALIDATION_TEXT = 'This field is required.';
const INCORRECT_EMAIL_TEXT = 'メールアドレスが間違っています。';

const LoginSchema = Yup.object().shape({
  mail_address: Yup.string()
    .email(INCORRECT_EMAIL_TEXT)
    .required(REQUIRED_VALIDATION_TEXT),
  user_password: Yup.string().required(REQUIRED_VALIDATION_TEXT),
});

export default function Login() {
  const isLogin = useSelector(loginStatusSelector);
  const loginErrorMessage = useSelector(showErrorMessageSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setIsChangeFieldStatus = (status: boolean) => {
    return {
      mail_address: status,
      user_password: status,
    };
  };

  const [isChangeFields, setIsChangeFields] = useState(
    setIsChangeFieldStatus(false),
  );

  const formik = useFormik({
    initialValues: {
      mail_address: '',
      user_password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      dispatch(appActions.loading(true));

      await dispatch(
        login({
          mail_address: values.mail_address,
          user_password: values.user_password,
        }),
      )
        .unwrap()
        .then(() => navigate(FIRST_SIDEBAR_URL))
        .catch((err: any) => err)
        .finally(() => dispatch(appActions.loading(false)));
    },
  });

  if (isLogin) return <Navigate to={FIRST_SIDEBAR_URL} />;

  return (
    <div className='login-main'>
      <div className='login-card'>
        <div className='login-images'>
          <img
            src='/assets/images/logo.svg'
            alt='Project logo'
            id='project_logo'
          />
        </div>
        <div className='login-form'>
          <div className='login-form-wrapper'>
            <p className='login-form-title'>{PROJECT_NAME}</p>
            <form id='formLogin' onSubmit={formik.handleSubmit}>
              {loginErrorMessage.trim() !== '' ? (
                <div className='form-items'>
                  <label className='form-items-error-label'>
                    {loginErrorMessage}
                  </label>
                </div>
              ) : (
                <></>
              )}
              <div className='form-items'>
                <label className='form-items-label'>
                  {LOGIN_FORM_FIELD_LABEL.EMAIL}
                </label>
                <label className='form-items-error-label'>
                  {isChangeFields.mail_address && formik.errors.mail_address}
                </label>
                <input
                  autoComplete='off'
                  className='form-items-input'
                  type='text'
                  name='mail_address'
                  id='mail_address'
                  onChange={(e) => {
                    setIsChangeFields({
                      ...isChangeFields,
                      mail_address: true,
                    });
                    formik.handleChange(e);
                  }}
                  value={formik.values.mail_address}
                />
              </div>
              <div className='form-items'>
                <label className='form-items-label'>
                  {LOGIN_FORM_FIELD_LABEL.PASSWORD}
                </label>
                <label className='form-items-error-label'>
                  {isChangeFields.user_password && formik.errors.user_password}
                </label>
                <input
                  autoComplete='off'
                  className='form-items-input'
                  type='password'
                  name='user_password'
                  id='user_password'
                  onChange={(e) => {
                    setIsChangeFields({
                      ...isChangeFields,
                      user_password: true,
                    });
                    formik.handleChange(e);
                  }}
                  value={formik.values.user_password}
                />
              </div>
              <div className='form-items'>
                <button
                  type='submit'
                  className='btn-login'
                  onMouseDown={() =>
                    setIsChangeFields(setIsChangeFieldStatus(true))
                  }
                >
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

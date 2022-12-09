/* eslint-disable no-unused-vars */
export const PROJECT_NAME = '文章チェックツール';

export const LOGIN_FORM_FIELD_LABEL = {
  EMAIL: 'メールアドレス',
  PASSWORD: 'パスワード<',
};

export const LOGIN = 'LOGIN';

export const MESSAGE_BOX_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const DEFAULT_MESSAGE_STATUS = 'success';

export const MESSAGE_BOX = 'messageBox';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT_OPTION = 20;
export const DEFAULT_AUTHORITY_OPTION = '1';
export const REQUEST_TIME_MAX = 1000;

export const DEFAULT_LIMIT_OPTIONS = [20, 50, 100];

export const PAGINATION_BUTTON_IDS = {
  PREV_BTN: '0',
  NEXT_BTN: '1',
};

export const GET_USER_ID_FROM_URL_REGEX =
  /\b(?!new)[0-9a-zA-Z!@#$%^&*)(+=._-]+$/g;

export const PASSWORD_DISPLAY_STATUS_ICON: any = {
  '1': {
    name: 'akar-icons:eye-open',
    value: '1',
  },
  '0': {
    name: 'akar-icons:eye-slashed',
    value: '0',
  },
};

export const DEFAULT_APP_URL_GUARD = false;

export const DEFAULT_USER_AUTHORITY_OPTIONS = [
  {
    name: '管理者',
    value: '1',
  },
  {
    name: '一般',
    value: '2',
  },
];

export const API_URL = {
  LOGIN: {
    METHOD: 'POST',
    PATH: '/auth/token',
  },
  USER: {
    PATH: '/users',
    CHECK_MAIL: '/users/email',
  },
};

export const APP_URL = {
  HOME: {
    PAGE_TITLE: 'Home',
    URL: '/',
  },
  LOGIN: {
    PAGE_TITLE: 'Login',
    URL: '/login',
  },
  USER: {
    TITLE: 'User management',
    LIST: {
      PAGE_TITLE: 'User search',
      URL: '/user',
    },
    NEW: {
      PAGE_TITLE: 'User registration',
      URL: '/user/new',
    },
    EDIT: {
      PAGE_TITLE: 'User edit',
      URL: '/user/edit/:id',
    },
  },
  NOT_FOUND: {
    URL: '*',
  },
};

export interface ILoginPayload {
  mail_address: string;
  user_password: string;
}

export interface IUserSearchData {
  user_name?: string;
  authority?: string;
  page?: number;
  limit?: number;
}

export interface IUserListItemPayload {
  user_id: number;
  user_name: string;
  authority: string;
}

export interface IUserDetailPayload {
  user_id: number;
  user_name: string;
  mail_address: string;
  user_password: string;
  authority: string;
}

export interface IUserRegistrationForm {
  user_name: string;
  mail_address: string;
  user_password: string;
  authority: string;
}

export interface IListParamConfig {
  page: number;
  limit: number;
}

export interface IMessageObject {
  isMessageBoxOpen: boolean;
  text?: string;
  messageStatus?: number;
}
export interface IMessageBoxPayload {
  isMessageBoxOpen: boolean;
  text?: string;
  messageStatus?: string;
}

export interface IConfirmBoxPayload {
  isConfirmBoxOpen: boolean;
  nameModal?: string;
}

export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

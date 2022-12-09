export enum MODEL_NAME {
  USER = 'users',
}

export enum DELETE_FLG {
  NO = 0,
  YES,
}

export enum AUTHORITY {
  管理者 = 1,
  一般 = 2,
}

export const DEFAULT_LIMIT = 20;

export const DEFAULT_OFFSET = 0;

export const DEFAULT_AUTHORITY = 1;

export const TIME_FORMAT = 'ja-JP';

export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

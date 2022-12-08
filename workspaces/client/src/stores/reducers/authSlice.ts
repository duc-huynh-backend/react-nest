import {
  LOGIN,
  ILoginPayload,
  MESSAGE_BOX_STATUS,
  MINI_SIDE_BAR,
} from './../../utils/constants';
import { sessionService } from './../../services/sessionService';
import { appActions } from 'src/stores/reducers/appSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from 'src/services';

export interface IAuthState {
  isLogin: boolean;
  errorLoginMessage: string;
}

const initialState: IAuthState = {
  isLogin: false,
  errorLoginMessage: '',
};

export const logout = createAsyncThunk(
  'authSlice/logout',
  async (_, thunkAPI) => {
    try {
      sessionService.remove(LOGIN);
      thunkAPI.dispatch(appActions.setAccessToken(''));
      sessionStorage.removeItem(MINI_SIDE_BAR);
      return true;
    } catch (error: any) {
      thunkAPI.dispatch(
        appActions.messageBoxDisplay({
          isMessageBoxOpen: true,
          text: error.response.data.message,
          messageStatus: MESSAGE_BOX_STATUS.ERROR,
        }),
      );
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) as any;

export const login = createAsyncThunk(
  'authSlice/login',
  async (loginData: ILoginPayload, thunkAPI) => {
    try {
      const {
        data: { accessToken },
      } = await authService.login(loginData);

      sessionService.set(LOGIN, 'true');
      thunkAPI.dispatch(appActions.changeAccessToken(accessToken));

      return accessToken;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) as any;

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setIsLogin: (state, action: { payload: boolean }) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogin = false;
    });

    builder.addCase(login.pending, (state, action) => {
      state.errorLoginMessage = '';
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogin = true;
    });

    builder.addCase(
      login.rejected,
      (state, action: { payload: { message: string } }) => {
        state.errorLoginMessage = action.payload.message || '';
      },
    );
  },
});

export const loginStatusSelector = (state: any) => state.authSlice.isLogin;
export const showErrorMessageSelector = (state: any) =>
  state.authSlice.errorLoginMessage;

export const { actions: authActions } = authSlice;

export default authSlice.reducer;

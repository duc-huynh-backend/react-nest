import { appActions } from 'src/stores/reducers/appSlice';
import {
  IUserSearchData,
  IUserRegistrationForm,
  IUserListItemPayload,
  IUserDetailPayload,
  DEFAULT_PAGE,
  DEFAULT_LIMIT_OPTION,
  MESSAGE_BOX_STATUS,
} from './../../utils/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from 'src/services';

export const USER_LIST_PARAMS = 'USER_LIST_PARAMS';

const initialState = {
  userList: [] as Array<IUserListItemPayload>,
  totalUsers: 0,
  totalPages: 0,
  userDetail: {} as IUserDetailPayload,
  searchData: {
    user_name: '',
    authority: '',
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT_OPTION,
  },
  deleteUserId: null,
};

export const getUsers = createAsyncThunk(
  'userSlice/getUsers',
  async (searchData: IUserSearchData, thunkAPI) => {
    // Default search params
    const requestObject = { ...initialState.searchData };

    // Overwrite by new search params
    Object.assign(requestObject, searchData);

    try {
      const result = await userService.list(requestObject);
      const {
        users,
        totalUsers,
      }: { users: Array<IUserListItemPayload>; totalUsers: number } =
        result.data;

      return {
        users,
        totalUsers,
        searchParams: { ...requestObject },
      };
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

export const getUser = createAsyncThunk(
  'userSlice/getUser',
  async (id: string, thunkAPI) => {
    try {
      const result = await userService.detail(id);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
) as any;

export const createUser = createAsyncThunk(
  'userSlice/createUser',
  async (formData: IUserRegistrationForm, thunkAPI) => {
    try {
      await userService.create(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
) as any;

export const editUser = createAsyncThunk(
  'userSlice/editUser',
  async (objectData: any, thunkAPI) => {
    const { formData, userId } = objectData;
    try {
      await userService.edit(formData, userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
) as any;

export const deleteUser = createAsyncThunk(
  'userSlice/deleteUser',
  async (userId: number, thunkAPI) => {
    try {
      await userService.remove(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
) as any;

export const checkEmail = createAsyncThunk(
  'userSlice/checkEmail',
  async (email: string, thunkAPI) => {
    try {
      const result = await userService.checkEmail(email);
      const { isExist }: { isExist: boolean } = result.data;
      return isExist;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
) as any;

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    countTotalPage: (state) => {
      let countPage = 0;

      if (Number(state.totalUsers) < Number(state.searchData.limit)) {
        countPage = 1;
      } else {
        countPage = state.totalPages = Math.ceil(
          Number(state.totalUsers) / Number(state.searchData.limit),
        );
      }

      state.totalPages = countPage;
    },
    getDeleteUserId: (state, action) => {
      state.deleteUserId = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.userList = [];
      })
      .addCase(
        getUsers.fulfilled,
        (state, { payload: { users, totalUsers, searchParams } }) => {
          state.userList = users;
          state.totalUsers = totalUsers;
          Object.assign(state.searchData, searchParams);
        },
      )
      .addCase(getUser.pending, (state) => {
        state.userDetail = {} as any;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        Object.assign(state.userDetail, payload);
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleteUserId = null;
      });
  },
});

export const userListSelector = (state: any) => state.userSlice.userList;
export const userDetailSelector = (state: any) => state.userSlice.userDetail;
export const selectUserListLength = (state: any) =>
  state.userSlice.userList?.length;
export const totalUsersSelector = (state: any) => state.userSlice.totalUsers;
export const limitSelector = (state: any) => state.userSlice.searchData.limit;
export const pageSelector = (state: any) => state.userSlice.searchData.page;
export const totalPagesSelector = (state: any) => state.userSlice.totalPages;
export const deleteUserIdSelector = (state: any) =>
  state.userSlice.deleteUserId;
export const searchDataSelector = (state: any) => state.userSlice.searchData;

export const { actions: userActions } = userSlice;

export default userSlice.reducer;

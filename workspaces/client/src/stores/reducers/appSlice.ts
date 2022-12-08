import { DEFAULT_MESSAGE_STATUS } from './../../utils/constants';
import { IConfirmBoxPayload, IMessageBoxPayload } from 'src/utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
  isLoading: boolean;
  accessToken: string;
  messageBox: IMessageBoxPayload;
  confirmBox: IConfirmBoxPayload;
  pageTitle: string;
}

const initialAppState: IAppState = {
  pageTitle: '',
  isLoading: false,
  accessToken: '',
  messageBox: {
    isMessageBoxOpen: false,
    text: '',
    messageStatus: DEFAULT_MESSAGE_STATUS,
  },
  confirmBox: {
    isConfirmBoxOpen: false,
    nameModal: '',
  },
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState: initialAppState,
  reducers: {
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
    messageBoxDisplay: (state, action: { payload: IMessageBoxPayload }) => {
      state.messageBox.isMessageBoxOpen = action.payload.isMessageBoxOpen;
      state.messageBox.text = action.payload?.text || '';
      state.messageBox.messageStatus =
        action.payload?.messageStatus || DEFAULT_MESSAGE_STATUS;
    },
    displayConfirmBox: (state, action: { payload: IConfirmBoxPayload }) => {
      state.confirmBox.isConfirmBoxOpen = action.payload.isConfirmBoxOpen;
      state.confirmBox.nameModal = action.payload?.nameModal || '';
    },
    changeAccessToken: (state: IAppState, payload: PayloadAction<string>) => {
      state.accessToken = payload.payload;
    },
    setPageTitle: (state, action: { payload: string }) => {
      state.pageTitle = action.payload;
    },
    setAccessToken: (state, action: { payload: string }) => {
      state.accessToken = action.payload;
    },
  },
});

export const appLoadingSelector = (state: any) => state.appSlice.isLoading;
export const messageBoxObjectSelector = (state: any) =>
  state.appSlice.messageBox;
export const isMessageBoxOpenSelector = (state: any) =>
  state.appSlice.messageBox.isMessageBoxOpen;
export const confirmBoxObjectSelector = (state: any) =>
  state.appSlice.confirmBox;
export const isConfirmBoxOpenSelector = (state: any) =>
  state.appSlice.confirmBox.isConfirmBoxOpen;
export const accessTokenSelector = (state: any) => state.appSlice.accessToken;

export const pageTitleSelector = (state: any) => state.appSlice.pageTitle;

export const { actions: appActions } = appSlice;
export default appSlice.reducer;

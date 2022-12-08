import { configureStore } from '@reduxjs/toolkit';

import authSlice from './reducers/authSlice';
import appSlice from './reducers/appSlice';
import userSlice from './reducers/userSlice';

export const reduxStore = configureStore({
  reducer: {
    appSlice,
    userSlice,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

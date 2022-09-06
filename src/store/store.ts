import { configureStore } from '@reduxjs/toolkit';

import appSlice from './app/appSlice';
import noteSlice from './note/noteSlice';
import tagSlice from './tag/tagSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
	reducer: {
		appSlice,
		userSlice,
		noteSlice,
		tagSlice
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { registration, login, fileUpload, refreshTokens } from './userApi';

import { TUser, TAuth } from '../../types/user';

type userState = {
	user: TUser | null;
	accessToken: string;
	userLoading: boolean;
	uploadFileLoading: boolean;
};

const initialState: userState = {
	user: null,
	accessToken: '',
	userLoading: false,
	uploadFileLoading: false
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<TAuth>) => {
			state.user = action.payload.currentUser;

			state.accessToken = action.payload.accessToken;

			localStorage.refreshToken = action.payload.refreshToken;
		},
		setAvatar: (state, action: PayloadAction<string>) => {
			state.user!.avatar = action.payload;
		},
		deleteAccessToken: (state) => {
			state.accessToken = '';
		}
	},
	extraReducers: (builder) => {
		// Registration

		builder.addCase(registration.pending, (state) => {
			state.userLoading = true;
		});
		builder.addCase(registration.rejected, (state) => {
			state.userLoading = false;
		});
		builder.addCase(registration.fulfilled, (state) => {
			state.userLoading = false;
		});

		// Login

		builder.addCase(login.pending, (state) => {
			state.userLoading = true;
		});
		builder.addCase(login.rejected, (state) => {
			state.userLoading = false;
		});
		builder.addCase(login.fulfilled, (state) => {
			state.userLoading = false;
		});

		// Refresh tokens

		builder.addCase(refreshTokens.fulfilled, (state, action: PayloadAction<TAuth>) => {
			state.accessToken = action.payload.accessToken;
		});

		// File upload

		builder.addCase(fileUpload.pending, (state) => {
			state.uploadFileLoading = true;
		});
		builder.addCase(fileUpload.rejected, (state) => {
			state.uploadFileLoading = false;
		});
		builder.addCase(fileUpload.fulfilled, (state) => {
			state.uploadFileLoading = false;
		});
	}
});

export const { setAuthData, setAvatar, deleteAccessToken } = userSlice.actions;
export default userSlice.reducer;

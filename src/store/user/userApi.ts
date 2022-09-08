import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { API_URL } from './../../constants/apiUrl';

import { TCredential, TFormData, TAuth } from './../../types/user';

import { axiosConfig } from './../api/axiosConfig';
import { getNotes, getNotesTags } from './../note/noteApi';
import { getTags } from './../tag/tagApi';

import { setAuthData } from './userSlice';

import { showMessage } from '../app/appSlice';
import { RootState, AppDispatch } from '../store';

axios.defaults.withCredentials = true;

// Registration

export const registration = createAsyncThunk('auth/registration', async (credential: TCredential, thunkApi) => {
	try {
		const { data } = await axios.post<TAuth>(`${API_URL}/api/user/registration`, credential);

		if (data.currentUser) {
			thunkApi.dispatch(setAuthData(data));
			thunkApi.dispatch(getNotes());
			thunkApi.dispatch(getNotesTags());
			thunkApi.dispatch(getTags());
		}

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		thunkApi.dispatch(showMessage(error.response.data));

		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Login

export const login = createAsyncThunk('auth/login', async (credential: TCredential, thunkApi) => {
	try {
		const { data } = await axios.post<TAuth>(`${API_URL}/api/user/login`, credential);

		if (data.currentUser) {
			thunkApi.dispatch(setAuthData(data));
			thunkApi.dispatch(getNotes());
			thunkApi.dispatch(getNotesTags());
			thunkApi.dispatch(getTags());
		}

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		thunkApi.dispatch(showMessage(error.response.data));

		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Logout

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
	try {
		const { data } = await axios.delete<string>(`${API_URL}/api/user/logout`);

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Reload app

export const reloadApp = createAsyncThunk('auth/reloadApp', async (_, thunkApi) => {
	try {
		const { data } = await axios.get<TAuth>(`${API_URL}/api/user/refresh-tokens`);

		if (data.currentUser) {
			thunkApi.dispatch(setAuthData(data));
			thunkApi.dispatch(getNotes());
			thunkApi.dispatch(getNotesTags());
			thunkApi.dispatch(getTags());
		}

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Refresh tokens

export const refreshTokens = createAsyncThunk('auth/refreshTokens', async (_, thunkApi) => {
	try {
		const { data } = await axios.get<TAuth>(`${API_URL}/api/user/refresh-tokens`);

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Upload files

export const fileUpload = createAsyncThunk('userApi/fileUpload', async (payload: TFormData, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		const { data } = await $api.put<string>(payload.endpoint, payload.formData, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		});

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

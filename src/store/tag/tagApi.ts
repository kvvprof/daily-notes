import { createAsyncThunk } from '@reduxjs/toolkit';

import { TTag } from './../../types/tag';

import { axiosConfig } from '../api/axiosConfig';
import { AppDispatch } from '../store';
import { RootState } from '../store';

// Get tags

export const getTags = createAsyncThunk('tagApi/getTags', async (_, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const user = state.userSlice.user;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		const response = await $api.get(`/tag/${user?.user_id}`);

		return response.data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Add new tag

export const addTag = createAsyncThunk('tagApi/addTag', async (tag: TTag, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		const response = await $api.post(`/tag/create-tag`, tag);

		return response.data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Update tag

export const updateTag = createAsyncThunk('tagApi/updateTag', async (tag: TTag, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		await $api.put(`/tag/update-tag`, tag);

		return tag;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Delete tag

export const deleteTag = createAsyncThunk('tagApi/deleteTag', async (tag: TTag, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		await $api.delete(`/tag/delete-tag/${tag.tag_id}`);

		return tag;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

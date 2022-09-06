import { createAsyncThunk } from '@reduxjs/toolkit';

import { TTag } from './../../types/tag';

import { TNote } from '../../types/note';
import { axiosConfig } from '../api/axiosConfig';
import { AppDispatch } from '../store';
import { RootState } from '../store';

// Get notes

export const getNotes = createAsyncThunk('noteApi/getNotes', async (_, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);
	const user_id = state.userSlice.user?.user_id;
	const offset = state.noteSlice.offset;
	const archive = state.noteSlice.archive;

	try {
		const { data } = await $api.get<TNote[]>(`/note/get-notes/${user_id}/${offset}/${archive}`);

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Search notes

export const searchNotes = createAsyncThunk('noteApi/searchNotes', async (title: string, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);
	const user_id = state.userSlice.user?.user_id;
	const offset = state.noteSlice.offset;
	const archive = state.noteSlice.archive;

	try {
		const { data } = await $api.get<TNote[]>(
			`/note/search-notes/${user_id}/${offset}/${archive}/${title.toLowerCase()}`
		);

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Create note

export const createNote = createAsyncThunk('noteApi/createNote', async (_, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		const { data } = await $api.get<TNote>('/note/create-note');

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Update note

export const updateNote = createAsyncThunk('noteApi/updateNote', async (note: TNote, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		const { data } = await $api.put<TNote>('/note/update-note', note);
		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Delete note

export const deleteNote = createAsyncThunk('noteApi/deleteNote', async (note: TNote, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		await $api.delete(`/note/delete-note/${state.userSlice.user?.user_id}/${note.note_id}`);

		return note;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Get notes tags

export const getNotesTags = createAsyncThunk('noteApi/getNotesTags', async (_, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const user = state.userSlice.user;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		const { data } = await $api.get(`/note/get-note-tags/${user?.user_id}`);

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Add tag in note

export const addNoteTag = createAsyncThunk('noteApi/addNoteTag', async (tag: TTag, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		const { data } = await $api.post(`/note/add-note-tag/`, tag);

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

// Delete tag from note

export const deleteNoteTag = createAsyncThunk('noteApi/deleteNoteTag', async (tag_id: number | undefined, thunkApi) => {
	const state = thunkApi.getState() as RootState;
	const accessToken = state.userSlice.accessToken;
	const currentNote = state.noteSlice.currentNote;
	const $api = axiosConfig(accessToken, thunkApi.dispatch as AppDispatch);

	try {
		const { data } = await $api.delete(`/note/delete-note-tag/${tag_id}/${currentNote?.note_id}`);

		thunkApi.dispatch(getNotesTags());

		return data;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return thunkApi.rejectWithValue(error.response.data);
	}
});

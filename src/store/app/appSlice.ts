import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { defaultErrorMessage } from './../../constants/defaultErrorMessage';

import { createNote, getNotes, updateNote, searchNotes } from './../note/noteApi';
import { addTag, deleteTag, updateTag } from './../tag/tagApi';
import { fileUpload, registration, login, reloadApp } from './../user/userApi';

type AppState = {
	errorMessage: string;
	theme: string;
	appLoading: boolean;
};

const initialState: AppState = {
	errorMessage: '',
	theme: localStorage.getItem('dailyNotesTheme') || 'dark',
	appLoading: false
};

export const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		showMessage: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload;
		},

		changeTheme: (state) => {
			state.theme === 'light' ? (state.theme = 'dark') : (state.theme = 'light');
			localStorage.setItem('dailyNotesTheme', state.theme);
		}
	},
	extraReducers: (builder) => {
		// Registration

		builder.addCase(registration.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(registration.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// Login

		builder.addCase(login.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// Reload App

		builder.addCase(reloadApp.pending, (state) => {
			state.appLoading = true;
			state.errorMessage = '';
		});

		builder.addCase(reloadApp.fulfilled, (state) => {
			state.appLoading = false;
		});

		builder.addCase(reloadApp.rejected, (state, action: PayloadAction<any>) => {
			state.appLoading = false;
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// Get notes

		builder.addCase(getNotes.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(getNotes.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// Search notes

		builder.addCase(searchNotes.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(searchNotes.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// Create note

		builder.addCase(createNote.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(createNote.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// Update note

		builder.addCase(updateNote.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(updateNote.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// File upload

		builder.addCase(fileUpload.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(fileUpload.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// Add tag

		builder.addCase(addTag.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(addTag.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// Update tag

		builder.addCase(updateTag.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(updateTag.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});

		// Delete tag

		builder.addCase(deleteTag.pending, (state) => {
			state.errorMessage = '';
		});

		builder.addCase(deleteTag.rejected, (state, action: PayloadAction<any>) => {
			if (action.payload === undefined || action.payload.includes('<!DOCTYPE html>')) {
				state.errorMessage = defaultErrorMessage;
			} else {
				state.errorMessage = action.payload;
			}
		});
	}
});

export const { showMessage, changeTheme } = appSlice.actions;

export default appSlice.reducer;

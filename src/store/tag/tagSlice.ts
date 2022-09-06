import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TTag } from './../../types/tag';
import { getTags, addTag, updateTag, deleteTag } from './tagApi';

type TTagState = {
	isOpenTagManager: boolean;
	tags: TTag[];
	tagLoading: boolean;
};

const initialState: TTagState = {
	isOpenTagManager: false,
	tags: [],
	tagLoading: false
};

export const tagSlice = createSlice({
	name: 'tagSlice',
	initialState,
	reducers: {
		setIsOpenTagManager: (state, action: PayloadAction<boolean>) => {
			state.isOpenTagManager = action.payload;
		}
	},
	extraReducers: (builder) => {
		// Get tags

		builder.addCase(getTags.fulfilled, (state, action: PayloadAction<TTag[]>) => {
			state.tags = action.payload;
		});

		// Add new tag

		builder.addCase(addTag.pending, (state) => {
			state.tagLoading = true;
		});

		builder.addCase(addTag.rejected, (state) => {
			state.tagLoading = false;
		});

		builder.addCase(addTag.fulfilled, (state, action: PayloadAction<TTag>) => {
			state.tags.unshift(action.payload);
			state.tagLoading = false;
		});

		// Update tag

		builder.addCase(updateTag.pending, (state) => {
			state.tagLoading = true;
		});

		builder.addCase(updateTag.rejected, (state) => {
			state.tagLoading = false;
		});

		builder.addCase(updateTag.fulfilled, (state, action: PayloadAction<TTag>) => {
			state.tags = state.tags.map((tag) => {
				if (tag.tag_id === action.payload.tag_id) {
					return { ...action.payload };
				}
				return tag;
			});
			state.tagLoading = false;
		});

		// Delete tag

		builder.addCase(deleteTag.pending, (state) => {
			state.tagLoading = true;
		});

		builder.addCase(deleteTag.rejected, (state) => {
			state.tagLoading = false;
		});

		builder.addCase(deleteTag.fulfilled, (state, action: PayloadAction<TTag>) => {
			state.tags = state.tags.filter((tag) => tag.tag_id !== action.payload.tag_id);
			state.tagLoading = false;
		});
	}
});

export const { setIsOpenTagManager } = tagSlice.actions;

export default tagSlice.reducer;

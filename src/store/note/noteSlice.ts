import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';

import { offset } from './../../constants/offset';

import { TNewBLock } from './../../types/note';

import { TTag } from './../../types/tag';

import { deleteNote, getNotes, getNotesTags } from './../note/noteApi';
import { deleteTag, updateTag } from './../tag/tagApi';

import { createNote, updateNote, searchNotes } from './noteApi';

import { TBlock } from '../../types/note';
import { TNote } from '../../types/note';

type TNoteState = {
	currentNote: TNote | null;
	currentBlock: TBlock | null;
	notes: TNote[];
	notesTags: TTag[];
	offset: number;
	searchValue: string;
	blockPosition: number;
	hasMore: boolean;
	editorLoading: boolean;
	mainContentLoading: boolean;
	archive: boolean;
	isOpenNoteEditor: boolean;
	isSearchMode: boolean;
};

const initialState: TNoteState = {
	currentNote: null,
	currentBlock: null,
	notes: [],
	notesTags: [],
	offset: 0,
	searchValue: '',
	blockPosition: 0,
	hasMore: true,
	editorLoading: false,
	mainContentLoading: false,
	archive: false,
	isOpenNoteEditor: false,
	isSearchMode: false
};

export const noteSlice = createSlice({
	name: 'noteSlice',
	initialState,
	reducers: {
		setIsSearchMode: (state, action: PayloadAction<boolean>) => {
			state.isSearchMode = action.payload;
		},
		clearOffset: (state) => {
			state.offset = initialState.offset;
		},

		setHasMore: (state, action: PayloadAction<boolean>) => {
			state.hasMore = action.payload;
		},

		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},

		setIsOpenNoteEditor: (state, action: PayloadAction<boolean>) => {
			state.isOpenNoteEditor = action.payload;
		},

		setArchive: (state) => {
			state.archive = !state.archive;
		},

		setCurrentBlock: (state, action: PayloadAction<TBlock>) => {
			state.currentBlock = action.payload;
		},

		setCurrentNote: (state, action: PayloadAction<TNote | null>) => {
			state.currentNote = action.payload;
		},

		addTitle: (state, action: PayloadAction<string>) => {
			state.currentNote!.title = action.payload;
		},

		addBlock: (state, action: PayloadAction<TNewBLock>) => {
			if (state.currentNote!.blocks === null) {
				state.currentNote!.blocks = [];
			}

			state.currentNote?.blocks.forEach((item, index) => {
				if (item.id === action.payload.prevBlock?.id) {
					state.blockPosition = index + 1;
					return;
				}
				return;
			});

			switch (action.payload.type) {
				case 'subtitle':
					state.currentNote?.blocks.splice(state.blockPosition, 0, {
						id: uuidv4(),
						type: 'subtitle',
						data: {
							text: ''
						}
					});
					break;

				case 'paragraph':
					state.currentNote?.blocks.splice(state.blockPosition, 0, {
						id: uuidv4(),
						type: 'paragraph',
						data: {
							text: ''
						}
					});

					break;

				case 'code':
					state.currentNote?.blocks.splice(state.blockPosition, 0, {
						id: uuidv4(),
						type: 'code',
						data: {
							text: ''
						}
					});
					break;

				case 'picture':
					state.currentNote?.blocks.splice(state.blockPosition, 0, {
						id: uuidv4(),
						type: 'picture',
						data: {
							link: ''
						}
					});
					break;

				case 'link':
					state.currentNote?.blocks.splice(state.blockPosition, 0, {
						id: uuidv4(),
						type: 'link',
						data: {
							title: '',
							link: ''
						}
					});
					break;
				default:
					break;
			}
		},

		changeOrderUp: (state, action: PayloadAction<TBlock | null>) => {
			const arr = state.currentNote!.blocks;

			const index = arr.findIndex((e: TBlock) => e.id === action.payload?.id);

			if (index > 0) {
				[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
			}
		},

		changeOrderDown: (state, action: PayloadAction<TBlock | null>) => {
			const arr = state.currentNote!.blocks;

			const index = arr.findIndex((e) => e.id === action.payload?.id);

			if (index < arr.length - 1) {
				[arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
			}
		},

		updateText: (state, action: PayloadAction<TBlock>) => {
			state.currentNote!.blocks = state.currentNote!.blocks.map((block) => {
				if (block.id === action.payload.id) {
					return { ...block, data: { ...block.data, text: action.payload.data.text } };
				}
				return block;
			});
		},

		updateCodeBlock: (state, action: PayloadAction<TBlock>) => {
			state.currentNote!.blocks = state.currentNote!.blocks.map((block) => {
				if (block.id === action.payload.id) {
					return { ...block, data: { ...block.data, code: action.payload.data.code } };
				}
				return block;
			});
		},

		updateLink: (state, action: PayloadAction<TBlock>) => {
			state.currentNote!.blocks = state.currentNote!.blocks.map((block) => {
				if (block.id === action.payload.id) {
					return {
						...block,
						data: {
							...block.data,
							title: action.payload.data.title,
							link: action.payload.data.link
						}
					};
				}
				return block;
			});
		},

		updatePictureLink: (state, action: PayloadAction<TBlock>) => {
			state.currentNote!.blocks = state.currentNote!.blocks.map((block) => {
				if (block.id === action.payload.id) {
					return { ...block, data: { ...block.data, link: action.payload.data.link } };
				}
				return block;
			});
		},

		deleteBlock: (state, action: PayloadAction<TBlock | null>) => {
			state.currentNote!.blocks = state.currentNote!.blocks.filter((block) => block.id !== action.payload?.id);
			state.currentBlock = null;
		},

		closeEditor: (state, action: PayloadAction<TNote | null>) => {
			state.notes = state.notes
				.map((note) => {
					if (note.note_id === action.payload?.note_id) {
						return { ...action.payload };
					}
					return note;
				})
				.filter((note) => note.is_archived === state.archive);

			state.currentNote = null;
		}
	},
	extraReducers: (builder) => {
		// Get notes

		builder.addCase(getNotes.pending, (state) => {
			state.mainContentLoading = true;
		});

		builder.addCase(getNotes.rejected, (state) => {
			state.mainContentLoading = false;
		});

		builder.addCase(getNotes.fulfilled, (state, action: PayloadAction<TNote[]>) => {
			state.mainContentLoading = false;

			state.hasMore = true;

			if (action.payload.length < offset) {
				state.hasMore = false;
			}

			if (state.offset === 0) {
				state.notes = action.payload;
			} else {
				state.notes = state.notes.concat(action.payload);
			}

			state.offset += offset;
		});

		// Search notes

		builder.addCase(searchNotes.pending, (state) => {
			state.mainContentLoading = true;
		});

		builder.addCase(searchNotes.rejected, (state) => {
			state.mainContentLoading = false;
		});

		builder.addCase(searchNotes.fulfilled, (state, action: PayloadAction<TNote[]>) => {
			state.mainContentLoading = false;

			state.hasMore = true;

			if (action.payload.length < offset) {
				state.hasMore = false;
			}

			if (state.offset === 0) {
				state.notes = action.payload;
			} else {
				state.notes = state.notes.concat(action.payload);
			}

			state.offset += offset;
		});

		// Create note

		builder.addCase(createNote.pending, (state) => {
			state.mainContentLoading = true;
		});

		builder.addCase(createNote.rejected, (state) => {
			state.mainContentLoading = false;
		});

		builder.addCase(createNote.fulfilled, (state, action: PayloadAction<TNote>) => {
			state.mainContentLoading = false;
			state.currentNote = action.payload;
			state.notes.unshift(action.payload);
		});

		// Update note

		builder.addCase(updateNote.pending, (state) => {
			state.editorLoading = true;
		});

		builder.addCase(updateNote.rejected, (state) => {
			state.editorLoading = false;
		});

		builder.addCase(updateNote.fulfilled, (state, action: PayloadAction<TNote>) => {
			state.editorLoading = false;
		});

		// Delete note

		builder.addCase(deleteNote.pending, (state) => {
			state.editorLoading = true;
		});

		builder.addCase(deleteNote.rejected, (state) => {
			state.editorLoading = false;
		});

		builder.addCase(deleteNote.fulfilled, (state, action: PayloadAction<TNote>) => {
			state.editorLoading = false;
			state.notes = state.notes.filter((note) => note.note_id !== action.payload.note_id);
			state.currentNote = null;
		});

		// Get notes tags

		builder.addCase(getNotesTags.fulfilled, (state, action: PayloadAction<TTag[]>) => {
			state.notesTags = action.payload;
		});

		// Updated note tag

		builder.addCase(updateTag.pending, (state) => {
			state.editorLoading = true;
		});

		builder.addCase(updateTag.rejected, (state) => {
			state.editorLoading = false;
		});

		builder.addCase(updateTag.fulfilled, (state, action: PayloadAction<TTag>) => {
			state.editorLoading = false;

			state.notesTags = state.notesTags.map((tag) => {
				if (tag.tag_id === action.payload.tag_id) {
					return { ...tag, name: action.payload.name, color: action.payload.color };
				}
				return tag;
			});
		});

		// Delete note tag

		builder.addCase(deleteTag.pending, (state) => {
			state.editorLoading = true;
		});

		builder.addCase(deleteTag.rejected, (state) => {
			state.editorLoading = false;
		});

		builder.addCase(deleteTag.fulfilled, (state, action: PayloadAction<TTag>) => {
			state.editorLoading = false;
			state.notesTags = state.notesTags.filter((tag) => tag.tag_id !== action.payload.tag_id);
		});
	}
});

export const {
	setIsSearchMode,
	clearOffset,
	setSearchValue,
	setHasMore,
	addTitle,
	setArchive,
	addBlock,
	deleteBlock,
	updateText,
	updateLink,
	updatePictureLink,
	changeOrderUp,
	changeOrderDown,
	setCurrentBlock,
	setCurrentNote,
	setIsOpenNoteEditor,
	closeEditor,
	updateCodeBlock
} = noteSlice.actions;

export default noteSlice.reducer;

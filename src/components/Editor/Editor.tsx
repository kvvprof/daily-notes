/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import Blocks from './Blocks/Blocks';
import Counter from './Counter/Counter';
import EditorTags from './EditorTags/EditorTags';
import InitBlockPanel from './InitBlockPanel/InitBlockPanel';
import NoteTitle from './NoteTitle/NoteTitle';
import Options from './Options/Options';

import { showScroll } from '../../helpers/scrollController';
import useDebounce from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { updateNote } from '../../store/note/noteApi';
import { closeEditor, setIsOpenNoteEditor } from '../../store/note/noteSlice';

import './style.css';

import EditorLoader from '../Loaders/EditorLoader';

const Editor = () => {
	const dispatch = useAppDispatch();
	const isOpenNoteEditor = useAppSelector((state) => state.noteSlice.isOpenNoteEditor);
	const currentNote = useAppSelector((state) => state.noteSlice.currentNote);
	const debouncedValue = useDebounce(currentNote, 500);
	const [isEditorOptions, setEditorOptions] = useState(false);

	useEffect(() => {
		if (currentNote !== null && isOpenNoteEditor) {
			dispatch(updateNote(currentNote));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	const closeEditorHandler = () => {
		dispatch(setIsOpenNoteEditor(false));

		dispatch(closeEditor(currentNote));

		showScroll();
	};

	window.addEventListener('click', (event) => {
		const target = event.target as HTMLElement;

		if (
			!target.closest('.options') &&
			!target.closest('.editor__options') &&
			!target.closest('.menu-btn') &&
			!target.closest('.tag-manager')
		) {
			setEditorOptions(false);
		}
	});

	return (
		<div className='editor' style={{ display: isOpenNoteEditor ? 'block' : 'none' }}>
			<div className='editor__closing-area' onClick={closeEditorHandler}></div>
			<div className='editor__content'>
				<div className='editor__header'>
					<Counter />

					<div className='editor__loader'>
						<EditorLoader />
					</div>
				</div>

				<NoteTitle />

				{!currentNote?.blocks.length ? (
					<div className='editor__blocks'>
						<InitBlockPanel />
					</div>
				) : (
					<div className='editor__blocks'>
						{currentNote?.blocks.map((block) => (
							<Blocks key={block.id} id={block.id} type={block.type} data={block.data} />
						))}
					</div>
				)}

				<div className='editor__footer'>
					<EditorTags />

					<div className='regular-btn editor__options' onClick={() => setEditorOptions(true)} title='Опции'></div>
				</div>

				{isEditorOptions && <Options closeEditorHandler={closeEditorHandler} />}
			</div>
		</div>
	);
};

export default Editor;

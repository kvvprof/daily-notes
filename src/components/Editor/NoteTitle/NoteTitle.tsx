import ReactTextareaAutosize from 'react-textarea-autosize';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { addTitle } from '../../../store/note/noteSlice';

import './style.css';

const NoteTitle = () => {
	const currentNote = useAppSelector((state) => state.noteSlice.currentNote);
	const dispatch = useAppDispatch();

	return (
		<ReactTextareaAutosize
			className='note-title'
			maxLength={255}
			placeholder='Заголовок'
			value={currentNote?.title || ''}
			onChange={(event) => {
				dispatch(addTitle(event.target.value));
			}}
		/>
	);
};

export default NoteTitle;

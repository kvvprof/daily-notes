import { hideScroll } from '../../../helpers/scrollController';
import { useAppDispatch } from '../../../hooks/useRedux';
import { createNote, getNotes } from '../../../store/note/noteApi';
import { clearOffset, setHasMore, setIsOpenNoteEditor } from '../../../store/note/noteSlice';
import './style.css';

const CreateNote = () => {
	const dispatch = useAppDispatch();

	const createNoteHandler = async () => {
		await dispatch(createNote());

		dispatch(clearOffset());

		dispatch(setHasMore(false));

		hideScroll();

		dispatch(setIsOpenNoteEditor(true));

		dispatch(getNotes());
	};

	return (
		<button className='accent-btn create-note' onClick={createNoteHandler}>
			Создать
		</button>
	);
};

export default CreateNote;

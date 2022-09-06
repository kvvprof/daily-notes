import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { getNotes } from '../../../../store/note/noteApi';
import { clearOffset, setArchive } from '../../../../store/note/noteSlice';

const UploadNotesBtn = () => {
	const dispatch = useAppDispatch();
	const archive = useAppSelector((state) => state.noteSlice.archive);

	const getNotesHandler = () => {
		dispatch(setArchive());
		dispatch(clearOffset());
		dispatch(getNotes());
	};
	return (
		<button className='regular-btn side-menu__btn' onClick={getNotesHandler}>
			{archive === false ? 'Загрузить архив' : 'Загрузить актуальные'}
		</button>
	);
};

export default UploadNotesBtn;

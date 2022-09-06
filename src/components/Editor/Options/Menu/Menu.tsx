import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { deleteNote } from '../../../../store/note/noteApi';
import { setCurrentNote, setIsOpenNoteEditor } from '../../../../store/note/noteSlice';

type TMenu = {
	isOpenListOfTags: () => void;
	closeEditorHandler: () => void;
};

const Menu = ({ isOpenListOfTags, closeEditorHandler }: TMenu) => {
	const currentNote = useAppSelector((state) => state.noteSlice.currentNote);
	const dispatch = useAppDispatch();

	const archiveNote = () => {
		if (currentNote !== null) {
			if (currentNote.is_archived) {
				dispatch(setCurrentNote({ ...currentNote, is_archived: false }));
			} else {
				dispatch(setCurrentNote({ ...currentNote, is_archived: true }));
			}
		}
	};

	const deleteHandler = async () => {
		if (currentNote !== null) {
			await dispatch(deleteNote(currentNote));
		}

		dispatch(setIsOpenNoteEditor(false));
		dispatch(setCurrentNote(null));
	};

	return (
		<>
			<button className='regular-btn menu-btn' onClick={isOpenListOfTags}>
				Добавить тег
			</button>
			<button className='regular-btn menu-btn' onClick={archiveNote}>
				{currentNote?.is_archived ? 'Удалить из архива' : 'Архивировать'}
			</button>
			<button className='regular-btn menu-btn' onClick={deleteHandler}>
				Удалить
			</button>
			<button className='regular-btn menu-btn' onClick={closeEditorHandler}>
				Сохранить и закрыть
			</button>
		</>
	);
};

export default Menu;

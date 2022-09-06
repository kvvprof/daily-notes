import MiniNoteTags from './MiniNoteTags/MiniNoteTags';
import NoteBlock from './NoteBlock/NoteBlock';

import { hideScroll } from '../../../../helpers/scrollController';
import { useAppDispatch } from '../../../../hooks/useRedux';
import { setCurrentNote, setIsOpenNoteEditor } from '../../../../store/note/noteSlice';
import { TNote } from '../../../../types/note';

import './style.css';

const Note = (note: TNote) => {
	const dispatch = useAppDispatch();

	const openNoteEditor = () => {
		dispatch(setCurrentNote({ ...note }));

		dispatch(setIsOpenNoteEditor(true));

		hideScroll();
	};

	const updatedAt = new Date(note.updated_at * 1000);

	return (
		<div className='note' onClick={openNoteEditor}>
			<p className='note__updated'>{updatedAt.toLocaleString()}</p>

			<h3 className='note__title'>{note.title}</h3>

			{note.blocks?.map((block) => (
				<NoteBlock key={block.id} id={block.id} type={block.type} data={block.data} note_id={note.note_id} />
			))}

			<MiniNoteTags note={note} />
		</div>
	);
};

export default Note;

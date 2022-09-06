import InfiniteScroll from 'react-infinite-scroll-component';

import Note from './Note/Note';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import './style.css';
import { getNotes, searchNotes } from '../../../store/note/noteApi';

const ListOfNotes = () => {
	const notes = useAppSelector((state) => state.noteSlice.notes);
	const isLoading = useAppSelector((state) => state.noteSlice.mainContentLoading);
	const dispatch = useAppDispatch();
	const hasMore = useAppSelector((state) => state.noteSlice.hasMore);
	const searchValue = useAppSelector((state) => state.noteSlice.searchValue);

	const fetchNotes = () => {
		if (searchValue !== '') {
			dispatch(searchNotes(searchValue));
		} else {
			dispatch(getNotes());
		}
	};

	return (
		<section className='list-of-notes'>
			<InfiniteScroll
				className='list-of-notes__scroll-area'
				dataLength={notes.length}
				next={fetchNotes}
				hasMore={hasMore}
				height={'calc(100vh - 90px'}
				loader={''}>
				{notes.length === 0 && isLoading === false ? (
					<div className='list-of-notes__notes-info'>Заметки не найдены</div>
				) : (
					notes.map((note) => (
						<Note
							key={note.note_id}
							note_id={note.note_id}
							title={note.title}
							blocks={note.blocks}
							published={note.published}
							is_archived={note.is_archived}
							updated_at={note.updated_at}
						/>
					))
				)}
			</InfiniteScroll>
		</section>
	);
};

export default ListOfNotes;

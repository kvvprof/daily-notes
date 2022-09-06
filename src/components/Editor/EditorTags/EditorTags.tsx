import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import useTagStyles from '../../../hooks/useTagStyles';
import { deleteNoteTag } from '../../../store/note/noteApi';
import './style.css';

const EditorTags = () => {
	const notesTags = useAppSelector((state) => state.noteSlice.notesTags);
	const currentNote = useAppSelector((state) => state.noteSlice.currentNote);
	const dispatch = useAppDispatch();
	const tagColorSwitcher = useTagStyles();

	return (
		<section className='editor-tags'>
			{notesTags
				.filter((tag) => tag.note_id === currentNote?.note_id)
				.map((tag) => (
					<div
						className='editor-tag__tag'
						style={tagColorSwitcher(tag)}
						key={tag.tag_id}
						onClick={() => dispatch(deleteNoteTag(tag.tag_id))}>
						{tag.name}
					</div>
				))}
		</section>
	);
};

export default EditorTags;

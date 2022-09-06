import { hideScroll } from '../../../../helpers/scrollController';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import useTags from '../../../../hooks/useTags';
import useTagStyles from '../../../../hooks/useTagStyles';
import { addNoteTag, getNotesTags } from '../../../../store/note/noteApi';
import { setIsOpenTagManager } from '../../../../store/tag/tagSlice';
import { TTag } from '../../../../types/tag';
import './style.css';

const ListOfTags = () => {
	const dispatch = useAppDispatch();
	const currentNote = useAppSelector((state) => state.noteSlice.currentNote);
	const { availableTags } = useTags(currentNote?.note_id);
	const tagColorSwitcher = useTagStyles();

	const addTagHandler = async (tag_id: number | undefined, note_id: number | undefined) => {
		await dispatch(addNoteTag({ tag_id, note_id } as TTag));
		dispatch(getNotesTags());
	};

	const openTagEditorHandler = () => {
		hideScroll();
		dispatch(setIsOpenTagManager(true));
	};

	return (
		<div className='list-of-tags'>
			<button className='regular-btn list-of-tags__tag-manager' onClick={openTagEditorHandler}>
				Менеджер тегов
			</button>
			{availableTags.map((tag) => (
				<div
					className='list-of-tags__tag'
					onClick={() => addTagHandler(tag.tag_id, currentNote?.note_id)}
					style={tagColorSwitcher(tag)}
					key={tag.tag_id}>
					{tag.name}
				</div>
			))}
		</div>
	);
};

export default ListOfTags;

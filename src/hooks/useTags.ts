import { TTag } from './../types/tag';
import { useAppSelector } from './useRedux';

const useTags = (note_id: number | undefined) => {
	const allTags = useAppSelector((state) => state.tagSlice.tags);
	const noteTags = useAppSelector((state) => state.noteSlice.notesTags);

	const currentNoteTags = noteTags.filter((tag) => tag.note_id === note_id);

	const searchTag = (tag: TTag) => {
		const currentTag = currentNoteTags.find((el) => el.tag_id === tag.tag_id);
		return currentTag?.tag_id;
	};

	const availableTags = allTags.filter((tag) => tag.tag_id !== searchTag(tag));

	return { currentNoteTags, availableTags };
};

export default useTags;

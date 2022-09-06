import useTags from '../../../../../hooks/useTags';
import useTagStyles from '../../../../../hooks/useTagStyles';
import { TNote } from '../../../../../types/note';
import './style.css';

type NoteTags = {
	note: TNote;
};

const MiniNoteTags = ({ note }: NoteTags) => {
	const { currentNoteTags } = useTags(note.note_id);
	const tagColorSwitcher = useTagStyles();

	return (
		<div className='mini-note-tags'>
			{currentNoteTags.map((tag) => (
				<div className='mini-note-tags__tag' style={tagColorSwitcher(tag)} key={tag.tag_id}>
					{tag.name}
				</div>
			))}
		</div>
	);
};

export default MiniNoteTags;

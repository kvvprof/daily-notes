import { useAppSelector } from '../../../hooks/useRedux';
import Tag from '../Tag/Tag';
import './style.css';

const TagList = () => {
	const tags = useAppSelector((state) => state.tagSlice.tags);

	return (
		<div className='tag-manager-list'>
			{tags.map((tag) => (
				<Tag
					key={tag.tag_id}
					tag_id={tag.tag_id}
					user_id={tag.user_id}
					name={tag.name}
					color={tag.color}
					selected={tag.selected}
				/>
			))}
		</div>
	);
};

export default TagList;

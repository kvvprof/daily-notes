import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import useTagStyles from '../../../../hooks/useTagStyles';
import { getNotes } from '../../../../store/note/noteApi';
import { clearOffset, setHasMore, setSearchValue } from '../../../../store/note/noteSlice';
import { updateTag } from '../../../../store/tag/tagApi';
import { TTag } from '../../../../types/tag';
import './style.css';

const SideMenuTagList = () => {
	const tags = useAppSelector((state) => state.tagSlice.tags);
	const tagColorSwitcher = useTagStyles();
	const dispatch = useAppDispatch();

	const selectTag = async (tag: TTag) => {
		await dispatch(updateTag({ ...tag, selected: !tag.selected }));

		dispatch(setSearchValue(''));
		dispatch(setHasMore(false));
		dispatch(clearOffset());
		dispatch(getNotes());
	};

	return (
		<div className='side-menu__tag-list'>
			{tags.map((tag) => (
				<div className='side-menu__tags' key={tag.tag_id} onClick={() => selectTag(tag)}>
					<div className='side-menu__tag' style={tagColorSwitcher(tag)} title={tag.name}>
						{tag.name}
					</div>
					{tag.selected && <div className='side-menu__active-tag'></div>}
				</div>
			))}
		</div>
	);
};

export default SideMenuTagList;

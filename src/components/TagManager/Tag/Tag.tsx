/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import useDebounce from '../../../hooks/useDebounce';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import useTagStyles from '../../../hooks/useTagStyles';
import { deleteTag, updateTag } from '../../../store/tag/tagApi';
import { TTag } from '../../../types/tag';
import ColorPanel from '../ColorPanel/ColorPanel';
import './style.css';

const Tag = (tag: TTag) => {
	const dispatch = useAppDispatch();
	const isOpenTagManager = useAppSelector((state) => state.tagSlice.isOpenTagManager);
	const [isColorsPanel, setIsColorsPanel] = useState(false);
	const [currentTag, setCurrentTag] = useState({
		name: tag.name,
		color: tag.color
	});
	const debouncedValue = useDebounce(currentTag, 500);
	const tagColorSwitcher = useTagStyles();

	const updateTagName = (name: string) => {
		setCurrentTag({ ...currentTag, name });
	};

	const updateTagColor = (color: string) => {
		setCurrentTag({ ...currentTag, color });
	};

	useEffect(() => {
		isOpenTagManager && dispatch(updateTag({ ...tag, name: currentTag.name, color: currentTag.color }));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	window.addEventListener('click', (event) => {
		const target = event.target as HTMLElement;

		if (!target.closest('.color-panel') && !target.closest('.tag-settings__color-picker')) {
			setIsColorsPanel(false);
		}
	});

	return (
		<div className='tag-settings' key={tag.tag_id}>
			<div className='tag-settings__wrapper'>
				<input
					className='tag-settings__name'
					type='text'
					defaultValue={currentTag.name}
					onChange={(event) => {
						updateTagName(event.target.value);
					}}
					style={tagColorSwitcher(tag)}
				/>

				<button className='regular-btn tag-settings__color-picker' onClick={() => setIsColorsPanel((prev) => !prev)}>
					цвет
				</button>

				<button className='regular-btn' onClick={() => dispatch(deleteTag(tag))}>
					удалить
				</button>
			</div>

			{isColorsPanel && <ColorPanel updateTagColor={updateTagColor} />}
		</div>
	);
};

export default Tag;

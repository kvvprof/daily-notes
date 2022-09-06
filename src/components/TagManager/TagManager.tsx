import NewTag from './NewTag/NewTag';
import TagList from './TagList/TagList';

import { showScroll } from '../../helpers/scrollController';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

import { setIsOpenTagManager } from '../../store/tag/tagSlice';

import './style.css';
import TagManagerLoader from '../Loaders/TagManagerLoader';

const TagManager = () => {
	const isOpenTagManager = useAppSelector((state) => state.tagSlice.isOpenTagManager);
	const dispatch = useAppDispatch();

	const closeTagManagerHandler = () => {
		dispatch(setIsOpenTagManager(false));

		showScroll();
	};

	return (
		<section className='tag-manager ' style={{ display: isOpenTagManager ? 'block' : 'none' }}>
			<div className='tag-manager__closing-area' onClick={closeTagManagerHandler}></div>
			<div className='tag-manager__content'>
				<div className='tag-manager__loader'>
					<TagManagerLoader />
				</div>

				<NewTag />

				<TagList />

				<button className='regular-btn' onClick={closeTagManagerHandler}>
					Закрыть
				</button>
			</div>
		</section>
	);
};

export default TagManager;

import { hideScroll } from '../../../../helpers/scrollController';
import { useAppDispatch } from '../../../../hooks/useRedux';
import { setIsOpenTagManager } from '../../../../store/tag/tagSlice';

const TagManagerBtn = () => {
	const dispatch = useAppDispatch();

	const openTagEditorHandler = () => {
		hideScroll();
		dispatch(setIsOpenTagManager(true));
	};

	return (
		<button className='regular-btn side-menu__btn' onClick={openTagEditorHandler}>
			Менеджер тегов
		</button>
	);
};

export default TagManagerBtn;

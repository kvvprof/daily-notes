import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { addBlock } from '../../../../../store/note/noteSlice';
import './style.css';

const BlockPanel = () => {
	const dispatch = useAppDispatch();
	const currentBlock = useAppSelector((state) => state.noteSlice.currentBlock);

	return (
		<div className='block-panel'>
			<button
				className='accent-btn editor__add-block-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'paragraph', prevBlock: currentBlock }));
				}}>
				aбзац
			</button>

			<button
				className='accent-btn editor__add-block-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'subtitle', prevBlock: currentBlock }));
				}}>
				подзаголовок
			</button>

			<button
				className='accent-btn editor__add-block-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'code', prevBlock: currentBlock }));
				}}>
				код
			</button>

			<button
				className='accent-btn editor__add-block-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'picture', prevBlock: currentBlock }));
				}}>
				картинка
			</button>

			<button
				className='accent-btn editor__add-block-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'link', prevBlock: currentBlock }));
				}}>
				ссылка
			</button>
		</div>
	);
};

export default BlockPanel;

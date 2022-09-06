import { useAppDispatch } from '../../../hooks/useRedux';
import { addBlock } from '../../../store/note/noteSlice';
import './style.css';

const InitBlockPanel = () => {
	const dispatch = useAppDispatch();

	return (
		<div className='init-block-panel'>
			<button
				className='regular-btn editor__add-block-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'paragraph' }));
				}}>
				aбзац
			</button>

			<button
				className='regular-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'subtitle' }));
				}}>
				подзаголовок
			</button>

			<button
				className='regular-btn editor__add-block-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'code' }));
				}}>
				код
			</button>

			<button
				className='regular-btn editor__add-block-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'picture' }));
				}}>
				картинка
			</button>

			<button
				className='regular-btn editor__add-block-btn'
				onClick={() => {
					dispatch(addBlock({ type: 'link' }));
				}}>
				ссылка
			</button>
		</div>
	);
};

export default InitBlockPanel;

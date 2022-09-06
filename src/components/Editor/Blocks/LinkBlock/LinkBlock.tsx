import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { showMessage } from '../../../../store/app/appSlice';
import { setCurrentBlock, updateLink } from '../../../../store/note/noteSlice';
import { TBlock } from '../../../../types/note';
import BlockTools from '../BlockTools/BlockTools';
import './style.css';

type TEditorBlockLink = {
	block: TBlock;
};

type TLink = {
	title: string;
	link: string;
};

const LinkBlock = ({ block }: TEditorBlockLink) => {
	const currentBlock = useAppSelector((state) => state.noteSlice.currentBlock);
	const dispatch = useAppDispatch();
	const [link, setLink] = useState<TLink>({ title: '', link: '' });

	const updateLinkBlockHandler = () => {
		if (link.title.trim() !== '' && link.link.trim() !== '') {
			dispatch(showMessage(''));
			dispatch(updateLink({ ...block, data: { ...block.data, title: link.title, link: link.link } }));
		} else {
			dispatch(showMessage('Все поля должны быть заполнены'));
		}
	};

	return (
		<div
			className='link-block'
			onMouseEnter={() => dispatch(setCurrentBlock(block))}
			onClick={() => dispatch(setCurrentBlock(block))}>
			{block.data.link && block.data.title ? (
				<div className='link-block__inner'>
					<div className='btn-regular link-block__ready-link'>
						<a href={block.data.link} target='_blank' rel='noopener noreferrer'>
							<h3 className='link-block__title'>{block.data.title}</h3>
							<p className='link-block__link'>{block.data.link}</p>
						</a>
					</div>
				</div>
			) : (
				<div className='link-block__inner'>
					<div className='link-block__settings'>
						<input
							className='link-block__input-title'
							type='text'
							placeholder='Название'
							onChange={(event) => setLink((prev) => ({ ...prev, title: event.target.value }))}
						/>

						<input
							className='link-block__input-link'
							type='text'
							placeholder='Ссылка'
							onChange={(event) => setLink((prev) => ({ ...prev, link: event.target.value }))}
						/>
					</div>

					<button className='regular-btn' onClick={updateLinkBlockHandler}>
						Сохранить
					</button>
				</div>
			)}

			{currentBlock?.id === block.id && <BlockTools />}
		</div>
	);
};

export default LinkBlock;

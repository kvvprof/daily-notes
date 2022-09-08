/* eslint-disable max-len */
import ReactTextareaAutosize from 'react-textarea-autosize';

import { API_URL } from '../../../../../constants/apiUrl';

import { useAppSelector } from '../../../../../hooks/useRedux';

import { TBlock } from '../../../../../types/note';
import './style.css';

const NoteBlock = (block: TBlock) => {
	const user = useAppSelector((state) => state.userSlice.user);

	switch (block.type) {
		case 'subtitle':
			return <ReactTextareaAutosize className='note-block note-block__subtitle' value={block.data.text} readOnly />;

		case 'paragraph':
			return <ReactTextareaAutosize className='note-block note-block__paragraph' value={block.data.text} readOnly />;

		case 'code':
			return <ReactTextareaAutosize className='note-block note-block__code' value={block.data.code} readOnly />;

		case 'picture':
			return (
				<img
					className='note-block note-block__picture'
					src={
						block.data.link?.includes('/')
							? block.data.link
							: `${API_URL}/userFiles/${user?.user_id}/notes/${block.note_id}/${block.data.link}`
					}
					alt=''
				/>
			);

		case 'link':
			return (
				<div className=' note-block note-block__link-inner'>
					<h3 className='note-block__link-title'>{block.data.title}</h3>
					<p className='note-block__link'>{block.data.link}</p>
				</div>
			);

		default:
			return <div>Данных нет</div>;
	}
};

export default NoteBlock;

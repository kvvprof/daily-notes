import React, { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { showMessage } from '../../../../store/app/appSlice';
import { setCurrentBlock, updatePictureLink } from '../../../../store/note/noteSlice';
import { fileUpload } from '../../../../store/user/userApi';
import { TBlock } from '../../../../types/note';
import { TFormData } from '../../../../types/user';
import UploadImageLoader from '../../../Loaders/UploadFileLoader';

import BlockTools from '../BlockTools/BlockTools';
import './style.css';

type TEditorBlockPicture = {
	block: TBlock;
};

const PictureBlock = ({ block }: TEditorBlockPicture) => {
	const dispatch = useAppDispatch();
	const filePicker = useRef() as React.MutableRefObject<HTMLInputElement>;
	const user = useAppSelector((state) => state.userSlice.user);
	const currentNote = useAppSelector((state) => state.noteSlice.currentNote);
	const currentBlock = useAppSelector((state) => state.noteSlice.currentBlock);
	const [link, setLink] = useState('');
	const isLoading = useAppSelector((state) => state.userSlice.uploadFileLoading);

	const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const formData = new FormData();
		const endpoint = `/note/file-upload/note/${user?.user_id}/${currentNote?.note_id}`;
		const file = event.target.files![0];

		if (file.size > 2_000_000) {
			dispatch(showMessage('Файл не должен превышать 2 мб'));
		} else {
			formData.append('file', event.target.files![0]);

			const { payload } = await dispatch(fileUpload({ formData, endpoint } as TFormData));

			setLink(payload as string);
		}
	};

	const filePickerHandler = () => {
		filePicker.current.click();
	};

	useEffect(() => {
		const updateLinkBlockHandler = () => {
			dispatch(updatePictureLink({ ...block, data: { ...block.data, link: link } }));
		};

		if (link !== '') {
			updateLinkBlockHandler();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [link]);

	return (
		<div
			className='picture-block'
			onMouseEnter={() => dispatch(setCurrentBlock(block))}
			onClick={() => dispatch(setCurrentBlock(block))}>
			<div className='picture-block__wrapper'>
				{block.data.link === '' ? (
					<div className='picture-block__upload'>
						<div className='picture-block__upload-area' onClick={filePickerHandler}>
							{isLoading ? (
								<UploadImageLoader />
							) : (
								<span>
									Нажмите сюда, чтобы загрузить картинку. <br />
									Форматы: jpg, jpeg, png. Макс. размер - 2 мб
								</span>
							)}
						</div>
					</div>
				) : (
					<img
						className='picture-block__picture'
						// eslint-disable-next-line max-len
						src={`http://localhost:3001/userFiles/${user?.user_id}/notes/${currentNote?.note_id}/${block.data.link}`}
						alt=''
					/>
				)}
			</div>

			<input
				className='hidden'
				value={block.data.text}
				type='file'
				accept='.png,.jpg, .jpeg'
				ref={filePicker}
				onChange={uploadHandler}
			/>

			{currentBlock?.id === block.id && <BlockTools />}
		</div>
	);
};

export default PictureBlock;

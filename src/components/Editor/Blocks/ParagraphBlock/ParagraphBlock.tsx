import React from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { deleteBlock, setCurrentBlock, updateText } from '../../../../store/note/noteSlice';
import { TBlock } from '../../../../types/note';
import BlockTools from '../BlockTools/BlockTools';
import './style.css';

type TEditorBlockParagraph = {
	block: TBlock;
};

const ParagraphBlock = ({ block }: TEditorBlockParagraph) => {
	const currentBlock = useAppSelector((state) => state.noteSlice.currentBlock);

	const dispatch = useAppDispatch();

	const updateTextBlockHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(updateText({ ...block, data: { ...block.data, text: event.target.value } }));
	};

	const deleteBlockIfBackspaceHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Backspace' && event.target.value === '') {
			dispatch(deleteBlock(block));
		}
	};

	return (
		<div
			className='paragraph-block'
			onMouseEnter={() => dispatch(setCurrentBlock(block))}
			onClick={() => dispatch(setCurrentBlock(block))}>
			<ReactTextareaAutosize
				className='paragraph-block__textarea'
				value={block.data.text}
				onChange={updateTextBlockHandler}
				onKeyDown={deleteBlockIfBackspaceHandler}
				placeholder='Текст'
				autoFocus
			/>

			{currentBlock?.id === block.id && <BlockTools />}
		</div>
	);
};

export default ParagraphBlock;

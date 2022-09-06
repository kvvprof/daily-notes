import React from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { deleteBlock, setCurrentBlock, updateCodeBlock } from '../../../../store/note/noteSlice';

import { TBlock } from '../../../../types/note';
import BlockTools from '../BlockTools/BlockTools';
import './style.css';

type TEditorBlockCode = {
	block: TBlock;
};

const CodeBlock = ({ block }: TEditorBlockCode) => {
	const currentBlock = useAppSelector((state) => state.noteSlice.currentBlock);
	const dispatch = useAppDispatch();

	const updateCodeBlockHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(updateCodeBlock({ ...block, data: { ...block.data, code: event.target.value } }));
	};

	const deleteBlockIfBackspaceHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Backspace' && event.target.value === '') {
			dispatch(deleteBlock(block));
		}
	};

	return (
		<div
			className='code-block'
			onMouseEnter={() => dispatch(setCurrentBlock(block))}
			onClick={() => dispatch(setCurrentBlock(block))}>
			<ReactTextareaAutosize
				className='code-block__textarea'
				value={block.data.code}
				onChange={updateCodeBlockHandler}
				onKeyDown={deleteBlockIfBackspaceHandler}
				placeholder='Код'
				autoFocus
			/>

			{currentBlock?.id === block.id && <BlockTools />}
		</div>
	);
};

export default CodeBlock;

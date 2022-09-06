import { useState } from 'react';

import BlockPanel from './BlockPanel/BlockPanel';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { changeOrderDown, changeOrderUp, deleteBlock } from '../../../../store/note/noteSlice';

import './style.css';

const BlockTools = () => {
	const dispatch = useAppDispatch();
	const [blockPanel, isBlockPanel] = useState(false);
	const currentBlock = useAppSelector((state) => state.noteSlice.currentBlock);

	const changeOrderUpHandler = () => {
		dispatch(changeOrderUp(currentBlock));
		isBlockPanel(false);
	};

	const changeOrderDownHandler = () => {
		dispatch(changeOrderDown(currentBlock));
		isBlockPanel(false);
	};

	const deleteBlockHandler = () => {
		dispatch(deleteBlock(currentBlock));
		isBlockPanel(false);
	};

	return (
		<div className='block-tools'>
			<div
				className='block-tools__tool block-tools__arrow-up'
				title='переместить выше'
				onClick={changeOrderUpHandler}></div>
			<div className='block-tools__tool block-tools__delete' title='удалить' onClick={deleteBlockHandler}></div>
			<div
				className='block-tools__tool block-tools__arrow-down'
				title='переместить ниже'
				onClick={changeOrderDownHandler}></div>
			<div
				className='block-tools__tool block-tools__add-block'
				title='добавить блок'
				onClick={() => isBlockPanel((prev) => !prev)}></div>
			{blockPanel && <BlockPanel />}
		</div>
	);
};

export default BlockTools;

import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { addTag } from '../../../store/tag/tagApi';
import './style.css';

const NewTag = () => {
	const [newTagName, setNewTagName] = useState('');
	const user = useAppSelector((state) => state.userSlice.user);
	const dispatch = useAppDispatch();

	const addNewTagHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (user !== null) {
				const user_id: number = user.user_id;

				await dispatch(addTag({ user_id, name: newTagName }));

				setNewTagName('');
			}
		}
	};

	return (
		<input
			className='new-tag'
			type='text'
			placeholder='Добавить тег (enter)'
			maxLength={50}
			value={newTagName}
			autoFocus
			onChange={(event) => setNewTagName(event.target.value)}
			onKeyDown={addNewTagHandler}
		/>
	);
};

export default NewTag;

import { useState } from 'react';

import ListOfTags from './ListOfTags/ListOfTags';
import Menu from './Menu/Menu';

import './style.css';

type TOptions = {
	closeEditorHandler: () => void;
};

const Options = ({ closeEditorHandler }: TOptions) => {
	const [isTags, setIsTags] = useState(false);

	const isOpenListOfTags = () => {
		setIsTags(true);
	};

	return (
		<div className='options'>
			<div className='options__wrapper' style={{ display: `${isTags ? 'none' : 'flex'}` }}>
				<Menu isOpenListOfTags={isOpenListOfTags} closeEditorHandler={closeEditorHandler} />
			</div>

			<div className='options__wrapper' style={{ display: `${isTags ? 'flex' : 'none'}` }}>
				<ListOfTags />
			</div>
		</div>
	);
};

export default Options;

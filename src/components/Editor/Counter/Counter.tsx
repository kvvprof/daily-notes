import { useAppSelector } from '../../../hooks/useRedux';
import './style.css';

const Counter = () => {
	const currentNote = useAppSelector((state) => state.noteSlice.currentNote);

	const countingCharacters = () => {
		let counter: number = 0;

		if (currentNote?.blocks !== null) {
			currentNote?.blocks.forEach((block) => {
				if (block.type !== 'picture' && block.type !== 'link') {
					counter += block.data.text!.length;
				}
			});
		}

		return counter.toLocaleString('ru');
	};

	return <div className='counter'>{countingCharacters()}</div>;
};

export default Counter;

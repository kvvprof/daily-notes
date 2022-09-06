import { getPartOfTheDay } from '../../../helpers/getPartOfTheDay';
import { useAppSelector } from '../../../hooks/useRedux';

const Greet = () => {
	const user = useAppSelector((state) => state.userSlice.user);

	const greeting = () => {
		const partOfTheDay = getPartOfTheDay();

		switch (partOfTheDay) {
			case 'утро':
				return `Доброе утро, ${user?.username}!`;
			case 'день':
				return `Добрый день, ${user?.username}!`;
			case 'вечер':
				return `Добрый вечер, ${user?.username}!`;
			case 'ночь':
				return `Доброй ночи, ${user?.username}!`;
			default:
				return `Здравствуйте, ${user?.username}!`;
		}
	};

	return <div className='greet'>{greeting()}</div>;
};

export default Greet;

export const getPartOfTheDay = () => {
	const date = new Date();
	const hours = date.getHours();

	if (hours > 5 && hours < 12) {
		return 'утро';
	}

	if (hours > 11 && hours < 18) {
		return 'день';
	}

	if (hours > 17 && hours <= 23) {
		return 'вечер';
	}

	if (hours >= 0 && hours < 6) {
		return 'ночь';
	}
};

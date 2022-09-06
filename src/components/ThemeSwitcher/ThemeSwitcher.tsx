import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { changeTheme } from '../../store/app/appSlice';
import './style.css';

const ThemeSwitcher = () => {
	const theme = useAppSelector((state) => state.appSlice.theme);
	const dispatch = useAppDispatch();

	return (
		<input
			className='theme-switcher'
			type='checkbox'
			checked={theme === 'light' ? true : false}
			onChange={() => dispatch(changeTheme())}
		/>
	);
};

export default ThemeSwitcher;

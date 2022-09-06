import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import bgDark from './assets/bg-dark.svg';
import bgLight from './assets/bg-light.svg';
import Header from './components/Header/Header';
import Notify from './components/Notify/Notify';

import { useAppDispatch, useAppSelector } from './hooks/useRedux';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import { reloadApp } from './store/user/userApi';

const App = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector((state) => state.userSlice.accessToken);
	const theme = useAppSelector((state) => state.appSlice.theme);
	const isLoading = useAppSelector((state) => state.appSlice.appLoading);

	useEffect(() => {
		if (theme === 'light') {
			document.body.style.backgroundImage = `url('${bgLight}')`;
			document.body.style.color = '#000';
			document.querySelector('#root')?.classList.add('light-theme');
		} else {
			document.body.style.backgroundImage = `url('${bgDark}')`;
			document.body.style.color = '#fff';
			document.querySelector('#root')?.classList.remove('light-theme');
		}
	}, [theme]);

	useEffect(() => {
		dispatch(reloadApp());
	}, [dispatch]);

	useEffect(() => {
		if (accessToken === '') {
			navigate('/login', { replace: true });
		} else {
			navigate('/', { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken]);

	if (isLoading) {
		return <Header />;
	}

	return (
		<>
			{accessToken !== '' ? (
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='*' element={<MainPage />} />
				</Routes>
			) : (
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/registration' element={<RegistrationPage />} />
					<Route path='*' element={<LoginPage />} />
				</Routes>
			)}
			<Notify />
		</>
	);
};

export default App;

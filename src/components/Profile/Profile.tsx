import { useNavigate } from 'react-router-dom';

import Avatar from './Avatar/Avatar';

import { useAppSelector } from '../../hooks/useRedux';

import './style.css';

const Profile = () => {
	const user = useAppSelector((state) => state.userSlice.user);
	const navigate = useNavigate();

	const exitHandler = () => {
		localStorage.removeItem('refreshToken');
		navigate(0);
	};

	return (
		<section className='profile'>
			<div className='profile__container'>
				<Avatar user={user} />

				<div className='profile__details'>
					<h1 className='profile__email'>EMAIL: {user?.email}</h1>
					<h2 className='profile__id'>ID: {user?.user_id}</h2>
				</div>

				<div className='profile__options'>
					<button className='regular-btn profile__options-btn' onClick={exitHandler}>
						Выйти
					</button>
				</div>
			</div>
		</section>
	);
};

export default Profile;

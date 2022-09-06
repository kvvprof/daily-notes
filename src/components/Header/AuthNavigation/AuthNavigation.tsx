import { NavLink } from 'react-router-dom';
import './style.css';

const AuthNavigation = () => {
	return (
		<nav className='auth-navigation'>
			<NavLink
				className={({ isActive }) =>
					isActive ? 'auth-navigation__link auth-navigation__link--active' : 'auth-navigation__link'
				}
				to='/login'>
				Войти
			</NavLink>

			<NavLink
				className={({ isActive }) =>
					isActive ? 'auth-navigation__link auth-navigation__link--active' : 'auth-navigation__link'
				}
				to='/registration'>
				Зарегистрироваться
			</NavLink>
		</nav>
	);
};

export default AuthNavigation;

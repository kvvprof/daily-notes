import { Link, useLocation } from 'react-router-dom';

import AuthNavigation from './AuthNavigation/AuthNavigation';
import CreateNote from './CreateNote/CreateNote';
import Greet from './Greet/Greet';
import MiniAvatar from './MiniAvatar/MiniAvatar';
import Search from './Search/Search';

import './style.css';
import MainContentLoader from '../Loaders/MainContentLoader';

const Header = () => {
	const { pathname } = useLocation();

	return (
		<header className='header'>
			<div className='header__logo-inner'>
				{pathname === '/login' || pathname === '/registration' ? (
					<h1 className='header__logo'>Daily Notes</h1>
				) : (
					<Link className='header__logo-link' to='/'>
						<h1 className='header__logo'>Daily Notes</h1>
					</Link>
				)}
			</div>

			{pathname === '/' && <MainContentLoader />}

			{pathname === '/' && <Search />}

			{pathname === '/' && <CreateNote />}

			{(pathname === '/login' || pathname === '/registration') && <AuthNavigation />}

			{pathname === '/' && <Greet />}

			{pathname === '/' && <MiniAvatar />}
		</header>
	);
};

export default Header;

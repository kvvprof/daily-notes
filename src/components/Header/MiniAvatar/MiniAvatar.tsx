import { Link } from 'react-router-dom';

import { API_URL } from '../../../constants/apiUrl';

import { useAppSelector } from '../../../hooks/useRedux';
import './style.css';

const MiniAvatar = () => {
	const user = useAppSelector((state) => state.userSlice.user);

	const getAvatarUrl = () => {
		if (user !== null) {
			return `url('${API_URL}/userFiles/${user.user_id}/profile/${user.avatar}')`;
		}
	};

	return (
		<Link className='mini-avatar' to='/profile'>
			<div
				className='mini-avatar__photo'
				style={{
					// eslint-disable-next-line max-len
					backgroundImage: user?.avatar && getAvatarUrl()
				}}>
				{<span>{user?.avatar === '' && '?'}</span>}
			</div>
		</Link>
	);
};

export default MiniAvatar;

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { showMessage } from '../../store/app/appSlice';
import './style.css';

const Notify = () => {
	const errorMessage = useAppSelector((state) => state.appSlice.errorMessage);
	const dispatch = useAppDispatch();

	return (
		<div
			className={`notify ${errorMessage !== '' && 'notify--active'}`}
			onClick={() => dispatch(showMessage(''))}>
			{errorMessage}
		</div>
	);
};

export default Notify;

import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { showMessage } from '../../../store/app/appSlice';
import { fileUpload } from '../../../store/user/userApi';
import { setAvatar } from '../../../store/user/userSlice';
import { TFormData, TUser } from '../../../types/user';
import UploadImageLoader from '../../Loaders/UploadFileLoader';
import './style.css';

type TAvatar = {
	user: TUser | null;
};

const Avatar = ({ user }: TAvatar) => {
	const isLoading = useAppSelector((state) => state.userSlice.uploadFileLoading);
	const dispatch = useAppDispatch();
	const filePicker = useRef() as React.MutableRefObject<HTMLInputElement>;

	const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const formData = new FormData();
		const endpoint = `/user/file-upload/avatar/${user?.user_id}`;
		const file = event.target.files![0];

		if (file.size > 2_000_000) {
			dispatch(showMessage('Файл не должен превышать 2 мб'));
		} else {
			dispatch(showMessage(''));
			formData.append('file', event.target.files![0]);

			const { payload } = await dispatch(fileUpload({ formData, endpoint } as TFormData));

			dispatch(setAvatar(payload as string));
		}
	};

	const filePickerHandler = () => {
		filePicker.current.click();
	};

	const getAvatarUrl = () => {
		if (user !== null) {
			return `url('http://localhost:3001/userFiles/${user.user_id}/profile/${user.avatar}')`;
		}
	};

	return (
		<div className='avatar'>
			<div
				className='avatar__upload'
				onClick={filePickerHandler}
				style={{
					backgroundImage: user?.avatar && getAvatarUrl()
				}}>
				{<span>{user?.avatar === '' && '?'}</span>}

				{isLoading && <UploadImageLoader />}
			</div>

			<p className='avatar__info'>
				Чтобы установить аватар нажмите на область выше.
				<br /> Доступные форматы: png, jpeg, jpg. Макс. размер - 2 мб.
			</p>

			<input
				type='file'
				className='profile__file-picker hidden'
				onChange={uploadHandler}
				ref={filePicker}
				accept='.png,.jpg,.jpeg'
			/>
		</div>
	);
};

export default Avatar;

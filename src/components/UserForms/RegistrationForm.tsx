/* eslint-disable max-len */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { showMessage } from '../../store/app/appSlice';
import { registration } from '../../store/user/userApi';
import { TCredential } from '../../types/user';
import AuthLoader from '../Loaders/AuthLoader';

import './style.css';

const RegistrationForm = () => {
	const [credential, setCredential] = useState<TCredential>({
		username: '',
		email: '',
		password: ''
	});
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.userSlice.userLoading);

	const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (credential.username!.trim() !== '' && credential.email.trim() !== '' && credential.password.trim() !== '') {
			dispatch(registration(credential));
			dispatch(showMessage(''));
		} else {
			dispatch(showMessage('Все поля должны быть заполнены'));
		}
	};

	return (
		<section className='user-form'>
			<form className='user-form__form' onSubmit={onSubmitHandler}>
				<h2 className='user-form__title'>Регистрация</h2>
				<h3 className='user-form__description'>Введите свои данные ниже, чтобы зарегистрироваться</h3>
				<input
					className='user-form__input'
					type='text'
					placeholder='Имя'
					maxLength={50}
					autoComplete='on'
					value={credential.username}
					onChange={(event) => setCredential({ ...credential, username: event.target.value })}
				/>
				<input
					className='user-form__input'
					type='email'
					placeholder='Электронная почта'
					maxLength={255}
					autoComplete='on'
					value={credential.email}
					onChange={(event) => setCredential({ ...credential, email: event.target.value })}
				/>
				<input
					className='user-form__input'
					type='password'
					placeholder='Пароль'
					minLength={4}
					autoComplete='on'
					value={credential.password}
					onChange={(event) => setCredential({ ...credential, password: event.target.value })}
				/>
				<p className='user-form__policy'>
					Внимание! Сервис работает в демонстрационном режиме и не предназначен для реального использования. Разработчик
					не несет ответственность за сохранность ваших персональных данных
				</p>
				<button className='accent-btn user-form__submit' type='submit'>
					{isLoading ? <AuthLoader /> : 'Зарегистрироваться'}
				</button>
				<Link className='user-form__redirect' to='/login'>
					или войдите в существующий аккаунт
				</Link>
			</form>
		</section>
	);
};

export default RegistrationForm;

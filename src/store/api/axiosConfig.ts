import axios from 'axios';

import { API_URL } from './../../constants/apiUrl';

import { TAuth } from './../../types/user';

import { AppDispatch } from '../store';
import { setAuthData } from '../user/userSlice';

export const axiosConfig = (accessToken: string, dispatch: AppDispatch) => {
	let currentAccessToken = accessToken;

	const $api = axios.create({
		withCredentials: false,
		baseURL: API_URL
	});

	$api.interceptors.request.use((config) => {
		config.headers!.Authorization = `Bearer ${currentAccessToken}`;
		return config;
	});

	$api.interceptors.response.use(
		(config) => {
			return config;
		},
		async (error) => {
			const originalRequest = error.config;

			if (error.response.status === 403 && error.config && !error.config._isRetry) {
				originalRequest._isRetry = true;

				try {
					const response = await axios.get<TAuth>(`${API_URL}/user/refresh-tokens`, {
						withCredentials: false,
						headers: {
							Authorization: `Bearer ${localStorage.refreshToken}`
						}
					});

					localStorage.setItem('refreshToken', response.data.refreshToken);

					dispatch(setAuthData(response.data));

					currentAccessToken = response.data.accessToken;

					return $api.request(originalRequest);
				} catch (error) {
					console.log(error);
				}
			}
			throw error;
		}
	);
	return $api;
};

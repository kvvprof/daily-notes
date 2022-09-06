import { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/useRedux';

import './style.css';

const MainContentLoader = () => {
	const isLoading = useAppSelector((state) => state.noteSlice.mainContentLoading);
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		let timer: number;

		if (isLoading) {
			setAnimate(true);
		} else {
			timer = window.setTimeout(() => {
				setAnimate(false);
			}, 1555);
		}

		return () => clearTimeout(timer);
	}, [isLoading]);

	return (
		<div className='loader' title='Индикатор загрузки'>
			<ul className='loader__items'>
				<li className={`${animate && 'loader__item-1'}`}></li>
				<li className={`${animate && 'loader__item-2'}`}></li>
				<li className={`${animate && 'loader__item-3'}`}></li>
			</ul>
		</div>
	);
};

export default MainContentLoader;

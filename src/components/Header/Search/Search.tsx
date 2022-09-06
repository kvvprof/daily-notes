import React, { useEffect } from 'react';

import useDebounce from '../../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getNotes, searchNotes } from '../../../store/note/noteApi';
import { clearOffset, setHasMore, setIsSearchMode, setSearchValue } from '../../../store/note/noteSlice';
import './style.css';

const Search = () => {
	const searchValue = useAppSelector((state) => state.noteSlice.searchValue);
	const debouncedValue = useDebounce(searchValue, 500);
	const dispatch = useAppDispatch();
	const isSearchMode = useAppSelector((state) => state.noteSlice.isSearchMode);

	const setTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchValue(event.target.value));
		dispatch(setIsSearchMode(true));
	};

	useEffect(() => {
		if (searchValue.trim().replace(/[^a-zа-яё0-9\s]/gi, '') !== '' && isSearchMode) {
			dispatch(clearOffset());
			dispatch(setHasMore(false));
			dispatch(searchNotes(searchValue));
		}

		if (searchValue.trim() === '' && isSearchMode) {
			dispatch(clearOffset());
			dispatch(setHasMore(false));
			dispatch(getNotes());
			dispatch(setIsSearchMode(false));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	return (
		<input
			className='search'
			type='text'
			placeholder='Поиск по названиям заметок'
			value={searchValue}
			onChange={setTitleHandler}
		/>
	);
};

export default Search;

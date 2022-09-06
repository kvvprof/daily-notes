export const hideScroll = () => {
	document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
	document.body.style.overflowY = 'hidden';
};

export const showScroll = () => {
	setTimeout(() => {
		document.body.style.paddingRight = '0';
		document.body.style.overflowY = 'auto';
	}, 300);
};

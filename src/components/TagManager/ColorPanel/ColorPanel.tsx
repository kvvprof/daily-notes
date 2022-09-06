import './style.css';

type TColorPanel = {
	updateTagColor: (color: string) => void;
};

const ColorPanel = ({ updateTagColor }: TColorPanel) => {
	return (
		<div className='color-panel'>
			<div
				className='color-panel__color'
				onClick={() => {
					updateTagColor('tag_color_1');
				}}></div>
			<div
				className='color-panel__color'
				onClick={() => {
					updateTagColor('tag_color_2');
				}}></div>
			<div
				className='color-panel__color'
				onClick={() => {
					updateTagColor('tag_color_3');
				}}></div>
			<div
				className='color-panel__color'
				onClick={() => {
					updateTagColor('tag_color_4');
				}}></div>
			<div
				className='color-panel__color'
				onClick={() => {
					updateTagColor('tag_color_5');
				}}></div>
		</div>
	);
};

export default ColorPanel;

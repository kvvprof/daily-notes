import { tagColors, TTag } from './../types/tag';
import { useAppSelector } from './useRedux';

const useTagStyles = () => {
	const theme = useAppSelector((state) => state.appSlice.theme);

	const tagColorSwitcher = (tag: TTag) => {
		const setTagColor = () => {
			switch (tag.color) {
				case 'tag_color_1':
					return tagColors.tag_color_1;

				case 'tag_color_2':
					return tagColors.tag_color_2;

				case 'tag_color_3':
					return tagColors.tag_color_3;

				case 'tag_color_4':
					return tagColors.tag_color_4;

				case 'tag_color_5':
					return tagColors.tag_color_5;

				default:
					return tagColors.tag_color_1;
			}
		};

		if (theme === 'light') {
			return {
				backgroundColor: setTagColor(),
				color: 'fff'
			};
		} else {
			return {
				border: `1px solid ${setTagColor()}`
			};
		}
	};

	return tagColorSwitcher;
};

export default useTagStyles;

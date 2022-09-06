export enum tagColors {
	tag_color_1 = '#2a63f2',
	tag_color_2 = '#5bb669',
	tag_color_3 = '#e17f4b',
	tag_color_4 = '#d7b63e',
	tag_color_5 = '#de586c'
}

export type TTag = {
	note_id?: number;
	tag_id?: number;
	name: string;
	color?: string;
	user_id: number;
	selected?: boolean;
};

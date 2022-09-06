export type TNote = {
	note_id: number;
	title: string;
	updated_at: number;
	is_archived: boolean;
	published: boolean;
	blocks: TBlock[];
};

export type TBlock = {
	id: string;
	type: string;
	data: {
		text?: string;
		link?: string;
		title?: string;
		code?: string;
	};
	note_id?: number;
};

export type TNewBLock = {
	type: string;
	prevBlock?: TBlock | null;
};

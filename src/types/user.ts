export type TUser = {
	user_id: number;
	username: string;
	password: string;
	avatar?: string;
	activated: boolean;
	email: string;
};

export type TCredential = {
	username?: string;
	email: string;
	password: string;
};

export type TAuth = {
	accessToken: string;
	refreshToken: string;
	currentUser: TUser;
};

export type TFormData = {
	formData: FormData;
	endpoint: string;
};

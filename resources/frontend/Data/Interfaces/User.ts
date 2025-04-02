export interface IUserState {
	user?: IUser;
}

export interface ITokenInformation {
	type: string;
	token: string;
}

export interface IUser {
	email: string;
	token: ITokenInformation;
}

export interface ILoginUserPayload {
	email: string;
	password: string;
}

import { IWithId } from "@/Data/Interfaces/Global";

export interface IWhitelist extends IWithId {
	steamId: string;
	username: string;
	expires: string;
	enabled: boolean;
}

export interface IWhitelistState {
	whitelist: IWhitelist[];
}

export interface ICreateWhitelistPayload extends Partial<IWhitelist> {
	orgId: number;
}

export interface IUpdateWhitelistPayload extends IWhitelist {
	orgId: number;
}

export interface IDeleteWhitelistPayload {
	orgId: number;
	whitelistId: number;
}

import { ReactNode } from "react";

export interface IWithChildren {
	children: ReactNode;
}

export interface IPaginatedRequestParams {
	size: string | number;
	page: string | number;
}

export type Nullable<Type> = Type | null;

export interface IWithId {
	id: number;
}

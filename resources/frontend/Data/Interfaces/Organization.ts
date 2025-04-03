export interface IOrganization {
	id: number;
	name: string;
	owner: number;
}

export interface IOrganizationState {
	organizations: IOrganization[];
}

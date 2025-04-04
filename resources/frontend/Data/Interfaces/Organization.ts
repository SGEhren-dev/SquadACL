export interface IOrganization {
	id: number;
	name: string;
	owner: number;
	maxSlots: number;
}

export interface IOrganizationState {
	organizations: IOrganization[];
}

import { IOrganizationState, IOrganization } from "@/Data/Interfaces/Organization.js";
import { DELETE, GET, PATCH, POST } from "@/Data/Network.js";
import { createAppSlice } from "@/Data/Redux/Helpers.js";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IOrganizationState = {
	organizations: []
};

const createOrganizationAsync = (payload: Partial<IOrganization>) => {
	return POST<Partial<IOrganization>, IOrganization>("server", payload);
};

const fetchOrganizationsAsync = () => {
	return GET<IOrganization[]>("server");
};

const updateOrganizationAsync = (payload: IOrganization) => {
	return PATCH<IOrganization, IOrganization>(`server/${ payload.id }`, payload);
};

const deleteOrganizationAsync = (payload: number) => {
	return DELETE(`server/${ payload }`)
		.then(() => payload);
};

const createOrganizationReducer = (state: IOrganizationState, action: PayloadAction<IOrganization>) => {
	const foundIndex = state.organizations.findIndex(org => org.id === action.payload.id);

	if (foundIndex > 0) {
		return;
	}

	state.organizations.push(action.payload);
};

const fetchOrganizationsReducer = (state: IOrganizationState, action: PayloadAction<IOrganization[]>) => {
	state.organizations = action.payload;
};

const updateOrganizationReducer = (state: IOrganizationState, action: PayloadAction<IOrganization>) => {
	const { id } = action.payload;
	const foundIndex = state.organizations.findIndex(org => org.id === id);

	if (foundIndex === -1) {
		return;
	}

	state.organizations[ foundIndex ] = action.payload;
};

const deleteOrganizationReducer = (state: IOrganizationState, action: PayloadAction<number>) => {
	state.organizations = state.organizations.filter(org => org.id !== action.payload);
};

const getOrganizationById = (state: IOrganizationState, id: number) => {
	return state.organizations.find(org => org.id = id);
};

const getOrganizations = (state: IOrganizationState) => state.organizations;

const organizationsSlice = createAppSlice({
	name: "organizationSlice",
	initialState,
	reducers: builder => ({
		createOrganizationAction: builder.asyncThunk(createOrganizationAsync, {
			fulfilled: createOrganizationReducer
		}),
		updateOrganizationAction: builder.asyncThunk(updateOrganizationAsync, {
			fulfilled: updateOrganizationReducer
		}),
		deleteOrganizationAction: builder.asyncThunk(deleteOrganizationAsync, {
			fulfilled: deleteOrganizationReducer
		}),
		fetchOrganizationsAction: builder.asyncThunk(fetchOrganizationsAsync, {
			fulfilled: fetchOrganizationsReducer
		})
	}),
	selectors: {
		selectOrganizationById: getOrganizationById,
		selectOrganizations: getOrganizations
	}
});

export default organizationsSlice;

export const {
	createOrganizationAction, updateOrganizationAction, deleteOrganizationAction, fetchOrganizationsAction
} = organizationsSlice.actions;

export const { selectOrganizationById, selectOrganizations } = organizationsSlice.selectors;

import { ICreateWhitelistPayload, IDeleteWhitelistPayload, IUpdateWhitelistPayload, IWhitelist, IWhitelistState } from "@/Data/Interfaces/Whitelist";
import { DELETE, GET, POST } from "@/Data/Network";
import { createAppSlice } from "@/Data/Redux/Helpers";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IWhitelistState = {
	whitelist: []
};

const fetchWhitelistsAsync = (payload: number) => {
	return GET<IWhitelist[]>(`organization/${ payload }/whitelists`);
};

const createWhitelistAsync = (payload: ICreateWhitelistPayload) => {
	const { orgId, ...restProps } = payload;

	return POST<Partial<IWhitelist>, IWhitelist>(`organization/${ orgId }/whitelists`, restProps);
};

const updateWhitelistAsync = (payload: IUpdateWhitelistPayload) => {
	const { orgId, ...restProps } = payload;

	return POST<IWhitelist, IWhitelist>(`organization/${ orgId }/whitelists/${ restProps.id }`, restProps);
};

const deleteWhitelistAsync = (payload: IDeleteWhitelistPayload) => {
	const { orgId, whitelistId } = payload;

	return DELETE(`organization/${ orgId }/whitelists/${ whitelistId }`)
		.then(() => whitelistId);
};

const fetchWhitelistsReducer = (state: IWhitelistState, action: PayloadAction<IWhitelist[]>) => {
	state.whitelist = action.payload;
};

const createWhitelistReducer = (state: IWhitelistState, action: PayloadAction<IWhitelist>) => {
	const { id } = action.payload;
	const foundIndex = state.whitelist.findIndex(whitelist => whitelist.id === id);

	if (foundIndex > 0) {
		return;
	}

	state.whitelist.push(action.payload);
};

const updateWhitelistReducer = (state: IWhitelistState, action: PayloadAction<IWhitelist>) => {
	const { id } = action.payload;
	const foundIndex = state.whitelist.findIndex(whitelist => whitelist.id === id);

	if (foundIndex === -1) {
		return;
	}

	state.whitelist[ foundIndex ] = action.payload;
};

const deleteWhitelistReducer = (state: IWhitelistState, action: PayloadAction<number>) => {
	state.whitelist = state.whitelist.filter(whitelist => whitelist.id !== action.payload);
};

const getWhitelist = (state: IWhitelistState) => {
	return state.whitelist;
};

const getWhitelistById = (state: IWhitelistState, id: number) => {
	return state.whitelist.find(whitelist => whitelist.id === id);
};

const whitelistSlice = createAppSlice({
	name: "whitelistSlice",
	initialState,
	reducers: builder => ({
		createWhitelistAction: builder.asyncThunk(createWhitelistAsync, {
			fulfilled: createWhitelistReducer
		}),
		updateWhitelistAction: builder.asyncThunk(updateWhitelistAsync, {
			fulfilled: updateWhitelistReducer
		}),
		deleteWhitelistAction: builder.asyncThunk(deleteWhitelistAsync, {
			fulfilled: deleteWhitelistReducer
		}),
		fetchWhitelistsAction: builder.asyncThunk(fetchWhitelistsAsync, {
			fulfilled: fetchWhitelistsReducer
		})
	}),
	selectors: {
		selectWhitelists: getWhitelist,
		selectWhitelistById: getWhitelistById
	}
});

export default whitelistSlice;

export const {
	createWhitelistAction, deleteWhitelistAction, fetchWhitelistsAction, updateWhitelistAction
} = whitelistSlice.actions;

export const { selectWhitelistById, selectWhitelists } = whitelistSlice.selectors;

import { IServer, IServerState } from "@/Data/Interfaces/Server";
import { DELETE, GET, PATCH, POST } from "@/Data/Network";
import { createAppSlice } from "@/Data/Redux/Helpers";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IServerState = {
	servers: []
};

const createServerAsync = (payload: Partial<IServer>) => {
	return POST<Partial<IServer>, IServer>("server", payload);
};

const fetchServersAsync = () => {
	return GET<IServer[]>("server");
};

const updateServerAsync = (payload: IServer) => {
	return PATCH<IServer, IServer>(`server/${ payload.id }`, payload);
};

const deleteServerAsync = (payload: number) => {
	return DELETE(`server/${ payload }`)
		.then(() => payload);
};

const createServerReducer = (state: IServerState, action: PayloadAction<IServer>) => {
	const foundIndex = state.servers.findIndex(server => server.id === action.payload.id);

	if (foundIndex > 0) {
		return;
	}

	state.servers.push(action.payload);
};

const fetchServersReducer = (state: IServerState, action: PayloadAction<IServer[]>) => {
	state.servers = action.payload;
};

const updateServerReducer = (state: IServerState, action: PayloadAction<IServer>) => {
	const { id } = action.payload;
	const foundIndex = state.servers.findIndex(server => server.id === id);

	if (foundIndex === -1) {
		return;
	}

	state.servers[ foundIndex ] = action.payload;
};

const deleteServerReducer = (state: IServerState, action: PayloadAction<number>) => {
	state.servers = state.servers.filter(server => server.id !== action.payload);
};

const getServerById = (state: IServerState, id: number) => {
	return state.servers.find(server => server.id = id);
};

const getServers = (state: IServerState) => state.servers;

const serversSlice = createAppSlice({
	name: "serversSlice",
	initialState,
	reducers: builder => ({
		createServerAction: builder.asyncThunk(createServerAsync, {
			fulfilled: createServerReducer
		}),
		updateServerAction: builder.asyncThunk(updateServerAsync, {
			fulfilled: updateServerReducer
		}),
		deleteServerAction: builder.asyncThunk(deleteServerAsync, {
			fulfilled: deleteServerReducer
		}),
		fetchServersAction: builder.asyncThunk(fetchServersAsync, {
			fulfilled: fetchServersReducer
		})
	}),
	selectors: {
		selectServerById: getServerById,
		selectServers: getServers
	}
});

export default serversSlice;

export const { createServerAction, updateServerAction, deleteServerAction, fetchServersAction } = serversSlice.actions;
export const { selectServerById, selectServers } = serversSlice.selectors;

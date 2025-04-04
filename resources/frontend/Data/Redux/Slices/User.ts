import { ILoginUserPayload, IUser, IUserState } from "@/Data/Interfaces/User";
import { POST } from "@/Data/Network";
import { createAppSlice } from "@/Data/Redux/Helpers";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserState = {
	user: undefined
};

const loginUserAsync = async (payload: ILoginUserPayload) => {
	return POST<ILoginUserPayload, IUser>("auth/login", payload);
};

const logoutUserAsync = async () => {
	return POST("auth/logout");
};

const loginUserReducer = (state: IUserState, action: PayloadAction<IUser>) => {
	state.user = action.payload;
};

const logoutUserReducer = () => {
	return initialState;
};

const getUser = (state: IUserState) => state.user;

const userSlice = createAppSlice({
	name: "userSlice",
	initialState,
	reducers: builder => ({
		loginUserAction: builder.asyncThunk(loginUserAsync, {
			fulfilled: loginUserReducer
		}),
		logoutUserAction: builder.asyncThunk(logoutUserAsync, {
			fulfilled: logoutUserReducer
		})
	}),
	selectors: {
		selectUser: getUser
	}
});

export default userSlice;

export const { loginUserAction, logoutUserAction } = userSlice.actions;
export const { selectUser } = userSlice.selectors;

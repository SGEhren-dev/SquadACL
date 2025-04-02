import {
	configureStore, EnhancedStore, Tuple, UnknownAction, ThunkDispatch,
	StoreEnhancer, Reducer, DevToolsEnhancerOptions
} from "@reduxjs/toolkit";
import {
	TypedUseSelectorHook, useSelector as reduxUseSelector, useDispatch as reduxUseDispatch
} from "react-redux";
import { AppState } from "@/Data/Redux/Reducers.js";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

export let store: EnhancedStore<AppState, UnknownAction, Tuple<[StoreEnhancer<{
	dispatch: ThunkDispatch<AppState, undefined, UnknownAction>; }>, StoreEnhancer]>>;

export const buildStore = (reducer: Reducer, devTools: DevToolsEnhancerOptions, middleware: any) => {
	store = configureStore({
		reducer: reducer,
		devTools,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
			}
		})
			.prepend(middleware)
	});
};

export const useAppSelector: TypedUseSelectorHook<AppState> = reduxUseSelector;
export const useAppDispatch: () => typeof store.dispatch = reduxUseDispatch;

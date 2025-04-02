import storage from "redux-persist/lib/storage";
import { buildStore, store } from "@/Data/Redux/Store.js";
import { AppState, rootReducer } from "@/Data/Redux/Reducers.js";
import { PersistConfig, persistStore, persistReducer } from "redux-persist";

const persistConfig: PersistConfig<AppState> = {
	key: "squad-acl",
	storage
};

buildStore(persistReducer(persistConfig, rootReducer), {}, []);

export const persistor = persistStore(store);

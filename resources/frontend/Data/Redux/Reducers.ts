
import { combineSlices } from "@reduxjs/toolkit";
import userSlice from "@/Data/Redux/Slices/User";
import serversSlice from "@/Data/Redux/Slices/Server";
import organizationsSlice from "@/Data/Redux/Slices/Organization";
import whitelistSlice from "@/Data/Redux/Slices/Whitelist";

export const rootReducer = combineSlices(userSlice, serversSlice, organizationsSlice, whitelistSlice);

export type AppState = ReturnType<typeof rootReducer>;

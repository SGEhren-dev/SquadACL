
import { combineSlices } from "@reduxjs/toolkit";
import userSlice from "@/Data/Redux/Slices/User.js";
import serversSlice from "@/Data/Redux/Slices/Server.js";
import organizationsSlice from "@/Data/Redux/Slices/Organization.js";

export const rootReducer = combineSlices(userSlice, serversSlice, organizationsSlice);

export type AppState = ReturnType<typeof rootReducer>;

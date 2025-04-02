
import { combineSlices } from "@reduxjs/toolkit";
import userSlice from "@/Data/Redux/Slices/User.js";

export const rootReducer = combineSlices(userSlice);

export type AppState = ReturnType<typeof rootReducer>;
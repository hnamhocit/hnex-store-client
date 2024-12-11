import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "@/interfaces/user";
import { RootState } from "..";

const initialState: { data: null | IUser } = { data: null };

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		setUser(state, payload) {
			state.data = payload.payload;
		},
		updateUser(state, payload) {
			state.data = { ...state.data, ...payload.payload };
		},
	},
});

export const selectUser = (state: RootState) => state.user.data;
export const { setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/types/user'
import { RootState } from '../..'
import { userExtraReducers } from './thunks'

export interface UserInitial {
	data: null | IUser
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error?: string
}

const initialState: UserInitial = {
	data: null,
	status: 'idle',
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser(state, payload) {
			state.status = 'succeeded'
			state.data = payload.payload
		},
	},
	extraReducers: userExtraReducers,
})

export const selectUser = (state: RootState) => state.user
export const { setUser } = userSlice.actions

export default userSlice.reducer

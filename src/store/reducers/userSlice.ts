import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '@/config/axios'
import { IUser } from '@/interfaces/user'
import { RootState } from '..'

const initialState: {
	data: null | IUser
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error?: string
} = { data: null, status: 'idle' }

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
	const { data } = await api.get('users/me')
	return data.data
})

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser(state, payload) {
			state.status = 'succeeded'
			state.data = payload.payload
		},
		updateUser(state, payload) {
			state.data = { ...state.data, ...payload.payload }
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data = action.payload
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export const selectUser = (state: RootState) => state.user
export const { setUser, updateUser } = userSlice.actions

export default userSlice.reducer

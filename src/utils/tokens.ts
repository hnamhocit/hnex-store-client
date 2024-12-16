import { IJwtToken } from '@/interfaces/jwtToken'

export const setTokens = (tokens: IJwtToken) => {
	localStorage.setItem('accessToken', tokens.accessToken)
	localStorage.setItem('refreshToken', tokens.refreshToken)
}

export const getTokens = (name?: string) => {
	if (name) return localStorage.getItem(name)

	return {
		accessToken: localStorage.getItem('accessToken'),
		refreshToken: localStorage.getItem('refreshToken'),
	}
}

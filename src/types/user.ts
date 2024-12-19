export enum Role {
	USER = 'USER',
	SELLER = 'SELLER',
	ADMIN = 'ADMIN',
}

export type User = {
	id: string
	email: string
	username: string | null
	emailVerified: boolean
	role: Role
	displayName: string
	refreshToken: string | null
	password: string
	photoURL: string | null
	backgroundURL: string | null
	activationCode: string | null
	actionationCodeExpiredIn: Date | null
	createdAt: Date
	updatedAt: Date
}

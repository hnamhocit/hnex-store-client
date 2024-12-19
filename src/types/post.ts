import { User } from './user'

export type Post = {
	id: string
	content: string
	imageIds: string[]
	user?: User
	userId: string
	createdAt: Date
	updatedAt: Date
}

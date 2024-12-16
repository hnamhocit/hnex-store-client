import { FC, memo } from 'react'

interface PostProps {
	slug: string
	id: string
	content: string
	attachments: string[]
	comments: []
	reactions: []
	views: number
	authorId: string
	author: string
}

const Post: FC<PostProps> = () => {
	return <div className='p-4 border bg-white rounded-2xl shadow-md'></div>
}

export default memo(Post)

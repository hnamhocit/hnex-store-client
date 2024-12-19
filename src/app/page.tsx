'use client'

import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Post from '@/components/ui/Post'
import api from '@/config/axios'
import { ToastContext } from '@/context/ToastContext'
import { selectUser } from '@/store/reducers/userSlice'
import { Post as IPost } from '@/types/post'

export default function Home() {
	const user = useSelector(selectUser)
	const { newToast } = useContext(ToastContext)
	const [posts, setPosts] = useState<IPost[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			const { data } = await api.get('posts')

			if ('error' in data) {
				newToast({ type: 'error', message: data.error })
				return
			}

			setLoading(false)
			setPosts(data.data)
		}

		fetchPosts()
	}, [newToast])

	return (
		<div className='space-y-5'>
			{posts.map((post) => (
				<Post key={post.id} {...post} />
			))}
		</div>
	)
}

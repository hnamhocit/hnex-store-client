import { Avatar } from '@nextui-org/react'
import {
	Edit01Icon,
	GlobalIcon,
	MoreVerticalCircle02Icon,
} from 'hugeicons-react'
import moment from 'moment'
import { FC, memo } from 'react'

import type { Post } from '@/types/post'
import Dropdown from '../Dropdown'

const Post: FC<Post> = ({ user, updatedAt, createdAt, content, imageIds }) => {
	const isChanged = updatedAt.getTime() - createdAt.getTime() > 0

	return (
		<div className='space-y-4 text-black p-4 border bg-white rounded-2xl shadow-md text-sm'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Avatar
						src={user?.photoURL ?? ''}
						alt={user?.displayName}
					/>

					<div>
						<div className='font-semibold'>{user?.displayName}</div>
						<div className='flex items-center gap-1 text-sm text-gray-500'>
							{isChanged ? (
								<Edit01Icon />
							) : (
								<GlobalIcon size={14} />
							)}

							{moment(isChanged ? updatedAt : createdAt).format(
								'DD/MM/YYYY'
							)}
						</div>
					</div>
				</div>

				<div className='flex items-center gap-3'>
					<Dropdown trigger={<MoreVerticalCircle02Icon size={24} />}>
						<button className='block p-2 rounded-2xl hover:bg-indigo-500 transition w-full text-white'>
							Share
						</button>
					</Dropdown>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-3'>
				{imageIds.map((id) => (
					<div
						className='bg-center bg-cover bg-no-repeat rounded-md'
						key={id}
						style={{
							backgroundImage: `url(http://localhost:8080:/api/v1/${id})`,
						}}></div>
				))}
			</div>

			<div>{content}</div>
		</div>
	)
}

export default memo(Post)

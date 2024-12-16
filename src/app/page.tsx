'use client'

import { Avatar } from '@nextui-org/react'
import { GlobalIcon, MoreVerticalCircle02Icon } from 'hugeicons-react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import Dropdown from '@/components/ui/Dropdown'
import { selectUser } from '@/store/reducers/userSlice'

export default function Home() {
	const user = useSelector(selectUser)

	return (
		<div className='space-y-5'>
			<div className='space-y-4 text-black p-4 border bg-white rounded-2xl shadow-md text-sm'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Avatar
							src={user.data?.photoURL}
							alt={user.data?.displayName}
						/>

						<div>
							<div className='font-semibold'>
								{user.data?.displayName}
							</div>
							<div className='flex items-center gap-1 text-sm text-gray-500'>
								<GlobalIcon size={14} />
								{moment(Date.now()).format('DD/MM/YYYY')}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Dropdown
							trigger={<MoreVerticalCircle02Icon size={24} />}>
							<button className='block p-2 rounded-2xl hover:bg-indigo-500 transition w-full text-white'>
								Share
							</button>
						</Dropdown>
					</div>
				</div>

				<div>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Nihil eaque quisquam porro recusandae dolor, odio quia optio
					reprehenderit voluptatum iusto fuga. Quibusdam dolore culpa
					architecto minus animi libero facilis nobis.
				</div>
			</div>
		</div>
	)
}

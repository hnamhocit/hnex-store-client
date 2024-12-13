import {
	DangerIcon,
	Logout01Icon,
	Profile02Icon,
	Settings01Icon,
} from 'hugeicons-react'
import { useSelector } from 'react-redux'

import Dropdown from '@/components/Dropdown'
import { selectUser } from '@/store/reducers/userSlice'
import { Avatar } from '@nextui-org/react'
import clsx from 'clsx'

const UserMenu = () => {
	const user = useSelector(selectUser)

	const items = {
		actions: {
			title: 'Actions',
			items: [
				{
					href: `/profile/${user.data?.id}`,
					content: 'Profile',
					startContent: <Profile02Icon />,
				},
				{
					content: 'Settings',
					startContent: <Settings01Icon />,
				},
			],
		},
		dangerZone: {
			title: 'Danger Zone',
			items: [
				{
					content: 'Logout',
					startContent: <Logout01Icon />,
					className: 'text-danger',
					color: 'danger',
				},
				{
					content: 'Delete account',
					startContent: <DangerIcon />,
					className: 'text-danger',
					color: 'danger',
				},
			],
		},
	}

	return (
		<Dropdown
			trigger={
				<Avatar
					src={user.data?.photoURL}
					alt={user.data?.displayName}
				/>
			}>
			{Object.entries(items).map((entry) => (
				<div key={entry[0]} className='space-y-3'>
					<div className='text-sm text-gray-500'>
						{entry[1].title}
					</div>

					{entry[1].items.map((item, i) => (
						<button
							key={i}
							className={clsx(
								'flex items-center gap-3 p-2 hover:bg-indigo-500 hover:text-white transition rounded-2xl w-full',
								{
									'text-danger': entry[0] === 'dangerZone',
								}
							)}>
							{item.startContent}
							{item.content}
						</button>
					))}
				</div>
			))}
		</Dropdown>
	)
}

export default UserMenu

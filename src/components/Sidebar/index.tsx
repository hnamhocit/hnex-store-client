import {
	Chatting01Icon,
	Home01Icon,
	Notification03Icon,
	QuillWrite02Icon,
	ShoppingBag02Icon,
	ShoppingCart02Icon,
} from 'hugeicons-react'
import Image from 'next/image'
import ActiveLink from './ActiveLink'
import UserMenu from './UserMenu'

const pages = [
	{
		href: '/',
		content: 'Home',
		icon: <Home01Icon />,
	},
	{
		href: '/posts/new',
		content: 'New post',
		icon: <QuillWrite02Icon />,
	},
	{
		href: '/notifications',
		content: 'Notifications',
		icon: <Notification03Icon />,
	},
	{
		href: '/chat',
		content: 'Chat',
		icon: <Chatting01Icon />,
	},
	{
		href: '/shopping',
		content: 'Shopping',
		icon: <ShoppingBag02Icon />,
	},
	{
		href: '/me/cart',
		content: 'Cart',
		icon: <ShoppingCart02Icon />,
	},
]

export type Pages = typeof pages
export type Page = Pages[0]

const Sidebar = () => {
	return (
		<div className='py-4 shrink-0 bg-[rgb(55,65,81,.5)] backdrop-blur-md w-16 flex flex-col gap-7 items-center'>
			<div className='shrink-0'>
				<Image
					src='/logo.jpg'
					width={48}
					height={48}
					alt='App Logo'
					className='rounded-full shrink-0 w-12 h-12 object-cover'
				/>
			</div>

			<div className='flex-1 flex flex-col justify-between'>
				<div className='space-y-3'>
					{pages.map((page) => (
						<ActiveLink key={page.href} {...page} />
					))}
				</div>

				<UserMenu />
			</div>
		</div>
	)
}

export default Sidebar

import { Tooltip } from '@nextui-org/react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, memo } from 'react'

import { Page } from '..'

const ActiveLink: FC<Page> = ({ content, href, icon }) => {
	const path = usePathname()

	return (
		<Tooltip content={content} placement='right' className='text-black'>
			<Link
				href={href}
				className={clsx(
					'p-3 rounded-2xl hover:bg-indigo-500 hover:text-white block transition',
					{
						'bg-indigo-500 text-white': path === href,
					}
				)}>
				{icon}
			</Link>
		</Tooltip>
	)
}

export default memo(ActiveLink)

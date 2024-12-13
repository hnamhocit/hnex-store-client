import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { FC, memo, ReactNode, useRef, useState } from 'react'

interface DropdownProps {
	children: ReactNode
	trigger: ReactNode
	triggerClassName?: string
	className?: string
	menuClassName?: string
}

const Dropdown: FC<DropdownProps> = ({
	children,
	trigger,
	triggerClassName,
	className,
	menuClassName,
}) => {
	const ref = useRef<HTMLDivElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	const toggleIsOpen = () => setIsOpen((prev) => !prev)

	return (
		<div ref={ref} className={clsx('relative', className)}>
			<motion.button
				whileTap={{ scale: 0.8, opacity: 0.8 }}
				onClick={toggleIsOpen}
				className={clsx(
					'flex items-center justify-center w-full gap-3',
					triggerClassName
				)}>
				{trigger}
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={menuRef}
						initial={{
							opacity: 0,
							translateY: 8,
						}}
						animate={{
							opacity: 1,
							translateY: -8,
						}}
						exit={{
							opacity: 0,
							translateY: 8,
						}}
						className={clsx(
							'absolute bottom-full left-0 min-h-60 min-w-60 rounded-2xl shadow-xl bg-[rgb(55,65,81,.5)] backdrop-blur-md space-y-3 p-4',
							menuClassName,
							{
								// 'bottom-0': isOverflowY,
								// 'top-full': !isOverflowY,
							}
						)}>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default memo(Dropdown)

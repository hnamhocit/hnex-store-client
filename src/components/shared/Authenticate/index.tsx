import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Enter from '@/components/shared/Enter/page'
import { useAppDispatch } from '@/store'
import { selectUser } from '@/store/reducers/userSlice'
import { fetchUser } from '@/store/reducers/userSlice/thunks'
import Spinner from '../../ui/Spinner'
import News from '../News'
import Sidebar from '../Sidebar'

const Authenticate = ({ children }: { children: ReactNode }) => {
	const dispatch = useAppDispatch()
	const user = useSelector(selectUser)

	useEffect(() => {
		if (user.status === 'idle') {
			dispatch(fetchUser())
		}
	}, [dispatch, user.status])

	if (user.status === 'loading') {
		return (
			<div className='h-screen flex items-center justify-center'>
				<Spinner />
			</div>
		)
	} else if (user.status === 'failed') {
		return <Enter />
	}

	return (
		<div className='flex h-screen overflow-hidden'>
			<Sidebar />
			<div className='flex-1 p-4 overflow-y-scroll'>{children}</div>
			<News />
		</div>
	)
}

export default Authenticate

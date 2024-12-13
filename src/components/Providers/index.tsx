'use client'

import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'

import { ToastProvider } from '@/context/ToastContext'
import { store } from '@/store'
import Authenticate from '../Authenticate'
import ToastContainer from '../ToastContainer'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<NextUIProvider>
				<ToastProvider>
					<Authenticate>{children}</Authenticate>
					<ToastContainer />
				</ToastProvider>
			</NextUIProvider>
		</Provider>
	)
}

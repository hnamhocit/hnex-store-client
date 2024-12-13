'use client'

import { Button } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { MdAlternateEmail } from 'react-icons/md'

import FormGroup from '@/components/FormGroup'
import api from '@/config/axios'
import { ToastContext } from '@/context/ToastContext'
import { setUser } from '@/store/reducers/userSlice'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import RegisterModal from './RegisterModal'

type FormData = {
	email: string
	password: string
}

const Enter = () => {
	const {
		formState: { errors },
		handleSubmit,
		control,
		reset,
	} = useForm<FormData>({
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const [disabled, setDisabled] = useState(false)
	const { newToast } = useContext(ToastContext)
	const dispatch = useDispatch()

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		setDisabled(true)
		const { data } = await api.post('auth/login', formData)

		if ('error' in data) {
			newToast({ type: 'error', message: data.error })
			setDisabled(false)
			return
		}

		localStorage.setItem('accessToken', data.data.accessToken)
		localStorage.setItem('refreshToken', data.data.refreshToken)

		const { data: userResponse } = await api.get('users/me', {
			headers: { Authorization: `Bearer ${data.data.accessToken}` },
		})
		dispatch(setUser(userResponse.data))

		reset()
		setDisabled(false)
		newToast({
			message: `Welcome back, ${userResponse.data.displayName} 👋`,
		})
		redirect('/')
	}

	return (
		<>
			<section className='star-fall'>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</section>

			<div className='flex items-center justify-center h-screen'>
				<div className='space-y-7 max-w-sm w-full'>
					<div className='text-center space-y-3'>
						<Image
							src='/logo.jpg'
							alt='App Logo'
							width={96}
							height={96}
							className='w-24 h-24 mx-auto rounded-full object-cover'
						/>

						<div className='text-gray-300 font-medium'>
							Buy anything, at anywhere, online, fast, reliable.
						</div>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='p-7 rounded-2xl bg-[rgba(0,0,0,.3)] backdrop-blur-3xl shadow-3xl space-y-7'>
						<Controller
							control={control}
							name='email'
							render={({ field: { value, onChange } }) => (
								<FormGroup
									label='Email'
									startIcon={<MdAlternateEmail size={20} />}
									value={value}
									onChange={onChange}
									errorMessage={errors.email?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name='password'
							render={({ field: { value, onChange } }) => (
								<FormGroup
									label='Password'
									isPassword
									value={value}
									onChange={onChange}
									errorMessage={errors.password?.message}
								/>
							)}
						/>

						<Button
							disabled={disabled}
							type='submit'
							fullWidth
							color='primary'
							radius='full'>
							Submit
						</Button>
					</form>

					<RegisterModal />
				</div>
			</div>
		</>
	)
}

export default Enter

'use client'

import { Button } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import FormGroup from '@/components/ui/FormGroup'
import Upload from '@/components/ui/Upload'
import api from '@/config/axios'
import { useAppDispatch } from '@/store'
import { selectUser } from '@/store/reducers/userSlice'
import { updateUser } from '@/store/reducers/userSlice/thunks'
import { IUser } from '@/types/user'
import { getUploadURL } from '@/utils/getUploadURL'
import { validate } from '@/utils/validate'
import { useState } from 'react'

type FormData = {
	username?: string
	displayName: string
	email: string
	password: string
	photoURL?: string
	backgroundURL?: string
}

const Settings = () => {
	const user = useSelector(selectUser)
	const dispatch = useAppDispatch()
	const [disabled, setDisabled] = useState(false)
	const {
		control,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<IUser>({
		defaultValues: {
			displayName: user.data?.displayName,
			email: user.data?.email,
			password: user.data?.password,
			username: user.data?.username ?? '',
		},
	})

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		setDisabled(true)
		dispatch(updateUser(formData))
		setDisabled(false)
	}

	const handleUploadFile = async (file: File) => {
		const formData = new FormData()
		formData.append('file', file)

		const { data } = await api.post('upload/file', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		const url = getUploadURL(data.data.id)
		return url
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='overflow-hidden space-y-7'>
			<div className='space-y-3'>
				<div className='text-gray-500'>Avatar</div>

				<Upload
					src={user.data?.photoURL}
					className='w-20 h-20 rounded-full'
					onFileChange={async (file) => {
						const url = await handleUploadFile(file)
						dispatch(updateUser({ photoURL: url }))
					}}
				/>
			</div>

			<div className='space-y-3'>
				<div className='text-gray-500'>Background</div>

				<Upload
					src={user.data?.backgroundURL}
					onFileChange={async (file) => {
						const url = await handleUploadFile(file)
						dispatch(updateUser({ backgroundURL: url }))
					}}
					className='w-[400px] h-60 rounded-2xl'
				/>
			</div>

			<Controller
				name='displayName'
				control={control}
				rules={{
					required: validate.required,
					minLength: 3,
				}}
				render={({ field: { value, onChange } }) => (
					<FormGroup
						label='Display name'
						value={value}
						onChange={onChange}
						className='max-w-80'
						errorMessage={errors.displayName?.message}
					/>
				)}
			/>

			<Controller
				name='username'
				control={control}
				rules={{
					required: validate.required,
				}}
				render={({ field: { value, onChange } }) => (
					<FormGroup
						label='Username'
						value={value}
						onChange={onChange}
						className='max-w-80'
					/>
				)}
			/>

			<Controller
				name='email'
				control={control}
				rules={{
					required: validate.required,
					pattern: validate.email,
				}}
				render={({ field: { value, onChange } }) => (
					<FormGroup
						label='Email'
						value={value}
						onChange={onChange}
						className='max-w-80'
					/>
				)}
			/>

			<Controller
				name='password'
				control={control}
				rules={{
					required: validate.required,
					pattern: validate.password,
				}}
				render={({ field: { value, onChange } }) => (
					<FormGroup
						label='Password'
						value={value}
						onChange={onChange}
						className='max-w-80'
					/>
				)}
			/>

			<Button
				disabled={disabled}
				color='primary'
				type='submit'
				radius='full'>
				Submit
			</Button>
		</form>
	)
}

export default Settings

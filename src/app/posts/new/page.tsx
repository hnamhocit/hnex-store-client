'use client'

import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { selectUser } from '@/store/reducers/userSlice'

const NewPost = () => {
	const user = useSelector(selectUser)
	const {
		formState: { errors },
		control,
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onChange',
	})

	return (
		<form className='space-y-3'>
			<Button color='primary' radius='full' type='submit'>
				Continue
			</Button>
		</form>
	)
}

export default NewPost

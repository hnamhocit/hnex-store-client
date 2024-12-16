import clsx from 'clsx'
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react'

interface UploadProps {
	src?: string
	onFileChange: (file: File) => void | Promise<void>
	className?: string
	mutiple?: boolean
}

const Upload: FC<UploadProps> = ({ src, onFileChange, className, mutiple }) => {
	const ref = useRef<HTMLInputElement>(null)
	const [blob, setBlob] = useState(src ?? '/empty-image.jpg')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0]
			setBlob(URL.createObjectURL(file))
			onFileChange(file)
		}
	}

	useEffect(() => {
		return () => {
			if (blob) {
				URL.revokeObjectURL(blob)
			}
		}
	}, [blob])

	return (
		<div>
			<input
				ref={ref}
				onChange={handleChange}
				type='file'
				accept='image/*'
				multiple={mutiple}
				hidden
			/>

			<div
				onClick={() => ref.current?.click()}
				className={clsx(
					'bg-center bg-cover bg-no-repeat cursor-pointer',
					className
				)}
				style={{
					backgroundImage: `url(${blob})`,
				}}></div>
		</div>
	)
}

export default memo(Upload)

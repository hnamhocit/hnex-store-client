export const getUploadURL = (id: string) => {
	const url = `http://localhost:8080/api/v1/upload/${id}`
	return url
}

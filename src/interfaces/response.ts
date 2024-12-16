export interface IResponse<T> {
	code: number
	data: T | null
	error?: string
}

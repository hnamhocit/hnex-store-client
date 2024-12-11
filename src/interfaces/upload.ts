import { IUser } from "./user";

export interface IUpload {
	id: string;
	buffer: Buffer;
	contentType: string;
	name: string;
	size: number;
	userId: string;
	user: IUser;
	createdAt: Date;
	updatedAt: Date;
}

import { IUpload } from "./upload";

export enum Role {
	USER = "USER",
	SELLER = "SELLER",
	ADMIN = "ADMIN",
}

export interface IUser {
	id: string;
	email: string;
	username?: string;
	emailVerified: boolean;
	role: Role;
	displayName: string;
	refreshToken?: string;
	password: string;
	photoURL?: string;
	backgroundURL?: string;
	activationCode?: string;
	actionationCodeExpiredIn?: Date;
	uploads: IUpload[];
	createdAt: Date;
	updatedAt: Date;
}

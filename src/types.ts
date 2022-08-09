export interface User {
	accent_color: string;
	avatar: string;
	banner: string;
	banner_color: string;
	discriminator: string;
	flags: number;
	id: string;
	locale: string;
	mfa_enabled: boolean;
	token: string;
	username: string;
	verified: boolean;
}

export interface UserData {
	id: string;
	name: string;
	discriminator: string;
	avatar: string;

}


export interface PageProps {
	user?: User;
}


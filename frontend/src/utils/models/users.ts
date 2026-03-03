export enum TypeUser { ADMIN = 'ADMIN', AUTHOR = 'AUTHOR', COMMENTATOR = 'COMMENTATOR' };
export enum TypeUserStatus { ACTIVE = 'ACTIVE', SUSPENDED = 'SUSPENDED', BANNED = 'BANNED' };

export type User = {
    userId: string;
    name: string;
    email: string;
    phone: string;
    photo: string;
    bio: string;
    country: string;
    state: string;
    city: string;
    address: string;
    typeuser: TypeUser;
    userStatus: TypeUserStatus;
    checked: boolean;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
}
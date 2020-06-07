export interface Users {
    userId?: number;
    firstName:string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    street: string;
    city: String;
    state: string;
    zip : number;
    phoneNumber: string;
    token?: string;
}
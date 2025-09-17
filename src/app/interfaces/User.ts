export interface User{
    id:number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
}

export type NewUser = Omit<User, 'id'>;

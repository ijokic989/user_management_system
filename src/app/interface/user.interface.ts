export interface UserInterface{
    id: number,
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    status: string;
    permissions: Array<string>
}
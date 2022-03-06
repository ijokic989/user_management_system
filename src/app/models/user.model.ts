import { UserInterface } from "../interface/user.interface";

export class User implements UserInterface {
    id: number = 0;
    first_name: string = '';
    last_name: string = '';
    username: string = '';
    password: string = '';
    email: string = '';
    status: string = 'blocked';
    permissions: Array<string> = []
  }
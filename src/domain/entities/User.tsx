import { Rol } from "./Rol";

export interface User {
    id?:             string;
    name:           string;
    lastname:       string;
    email:          string;
    phone:          string;
    password:       string;
    repeatPassword: string;
    session_token?:  string;
    roles?:         Rol[];
}
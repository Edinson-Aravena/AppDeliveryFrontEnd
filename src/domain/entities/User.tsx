import { Address } from "./Address";
import { Rol } from "./Rol";

export interface User {
    id?:             string;
    name:           string;
    lastname:       string;
    email:          string;
    phone:          string;
    image?:          string;
    password:       string;
    repeatPassword: string;
    session_token?:  string;
    roles?:         Rol[];
    address?:       Address;
}
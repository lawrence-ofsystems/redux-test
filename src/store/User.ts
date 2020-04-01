import Name from "./Name";
import Login from "./Login";

export default interface User {
    readonly name: Name;
    readonly email: string;
    readonly login: Login;
}
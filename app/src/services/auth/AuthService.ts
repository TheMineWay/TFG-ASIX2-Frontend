import { UserModel } from "./User.model";

type AuthStatus = {
    user?: UserModel;
}

export default class AuthService {
    static get authStatus(): AuthStatus {
        return {};
    }
}
import { LoginRequest } from "../../view/auth/LoginForm";
import { SignupRequest } from "../../view/auth/RegisterForm";
import request from "../api/Request";

type LoginResponse = {
    token: string;
    expiresAt: Date;
    user: {
        name: string;
        lastName: string;
        login: string;
        phone: string;
        isEmailVerified: boolean;
        createdAt: string;
        id: string;
    };
}
type SignupResponse = {
    token: string;
    expiresAt: Date;
}
export default class AuthService {
    static async login(data: LoginRequest): Promise<LoginResponse> {
        type RawLoginResponse = {
            token: string;
            expiresAt: string;
            user: {
                name: string;
                lastName: string;
                login: string;
                phone: string;
                isEmailVerified: "1" | "0";
                createdAt: string;
                id: string;
            };
        }

        const result = await request<RawLoginResponse>('post', '/actions/auth/login', data);

        return {
            ...result,
            expiresAt: new Date(Date.parse(result.expiresAt)),
            user: {
                ...result.user,
                isEmailVerified: result.user.isEmailVerified === '1'
            }
        };
    }

    static async signup(data: SignupRequest): Promise<SignupResponse> {
        type RawRegisterResponse = {
            token: string;
            expiresAt: string;
        }

        const result = await request<RawRegisterResponse>('post', '/actions/auth/signup', data);

        return {
            ...result,
            expiresAt: new Date(Date.parse(result.expiresAt))
        };
    }
}
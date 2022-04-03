import { useState } from "react";
import request from "../../services/api/Request";
import { processRawUserModel, RawUserModel, UserModel } from "../../services/auth/User.model";
import useAuthState from "../auth/useAuthState";

export type UseUsers = {
    users: UserModel[];
    getById: (id: string) => UserModel | undefined;
    getByIdAsync: (id: string) => Promise<UserModel>;
}

export default function useUsers(): UseUsers {

    const [authState] = useAuthState();
    const [users, setUsers] = useState<UserModel[]>([]);

    async function getByIdAsync(id: string): Promise<UserModel> {
        const user = users.find((u) => u.id === id);
        if(user) return user;
        const result = await request<{user: RawUserModel}>('post', '/actions/admin/users/userById', {userId: id}, {authCredentials: authState});
        
        const returnedUser = processRawUserModel(result.user);
        setUsers([
            ...users,
            returnedUser,
        ]);

        return returnedUser;
    }

    function getById(id: string): UserModel | undefined {
        const user = users.find((u) => u.id === id);
        if(user) return user;
        getByIdAsync(id);
        return undefined;
    }

    return {
        users,
        getById,
        getByIdAsync,
    }
}
import { useEffect, useState } from "react";
import request from "../../services/api/Request";
import { processRawUserModel, RawUserModel, UserModel } from "../../services/auth/User.model";
import useAuthState from "../auth/useAuthState";

export type UseUsers = {
    users: UserModel[];
    fetch: () => Promise<void>;
    getById: (id: string) => UserModel | undefined;
}

export default function useUsers(): UseUsers {

    const [authState] = useAuthState();
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        const result = await request<{users: RawUserModel[]}>('post', '/actions/admin/users/usersList', {}, {authCredentials: authState});
        const returnedUsers = result.users.map(processRawUserModel);
        setUsers(returnedUsers);
    }

    function getById(id: string): UserModel | undefined {
        return users.find((u) => u.id === id) ?? undefined;
    }

    return {
        users,
        fetch,
        getById,
    }
}
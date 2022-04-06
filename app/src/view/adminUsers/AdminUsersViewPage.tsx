import React from 'react'
import useUserAdmin from '../../hooks/user/useUserAdmin';
import AdminUsersViewList from './AdminUsersViewList';

export default function AdminUsersViewPage() {

    const userAdmin = useUserAdmin();

    return (
        <>
            <AdminUsersViewList
                userAdmin={userAdmin}
            />
        </>
    );
}

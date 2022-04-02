import { Permissions } from '../services/security/permissions';

type Route = {
    path: string;
    loader: () => any;
    requiresAuth?: boolean;
    permissions?: Permissions[];
};

const routes: Route[] = [
    {
        path: '/',
        loader: () => import('../view/mainPage/MainPage'),
    },
    {
        path: '*',
        loader: () => import('../view/errors/404'),
    },
    {
        path: '/admin/logs',
        loader: () => import('../view/logsPage/ViewLogsPage'),
        requiresAuth: true,
        permissions: [ Permissions.viewLogs ],
    },
    {
        path: '/user/profile',
        loader: () => import('../view/profile/ViewUserProfilePage'),
        requiresAuth: true,
    },
    {
        path: '/admin/users',
        loader: () => import('../view/adminUsers/AdminUsersViewPage'),
        requiresAuth: true,
        permissions: [ Permissions.adminUsers ],
    },
];

export default routes;
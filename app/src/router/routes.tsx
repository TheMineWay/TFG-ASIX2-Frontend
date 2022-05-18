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
        permissions: [Permissions.viewLogs],
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
        permissions: [Permissions.adminUsers],
    },
    {
        path: '/admin/inventory',
        loader: () => import('../view/adminInventory/AdminInventoryViewPage'),
        requiresAuth: true,
        permissions: [Permissions.adminInventory],
    },
    {
        path: '/admin/payments',
        loader: () => import('../view/adminPayments/ViewAdminPaymentsPage'),
        requiresAuth: true,
        permissions: [Permissions.adminPayments],
    },
    {
        path: '/user/session-history',
        loader: () => import('../view/sessionHistory/SessionHistoryViewPage'),
        requiresAuth: true,
    },
    {
        path: '/disk-request',
        loader: () => import('../view/diskRequest/DiskRequestViewPage'),
        requiresAuth: true,
    },
    {
        path: '/disk-request/list',
        loader: () => import('../view/diskRequestList/DiskRequestListViewPage'),
        requiresAuth: true,
    },
    {
        path: '/admin/disk-requests',
        loader: () => import('../view/adminDiskRequests/AdminDiskRequestsViewPage'),
        requiresAuth: true,
        permissions: [Permissions.adminDiskRequests],
    },
    {
        path: '/admin/contact-form',
        loader: () => import('../view/contactForm/admin/AdminContactFormViewPage'),
        requiresAuth: true,
        permissions: [Permissions.adminContactForm],
    },
    {
        path: '/privacy',
        loader: () => import('../view/policies/PoliciesViewPage'),
    },
    {
        path: '/admin/roles',
        loader: () => import('../view/adminRoles/AdminRolesViewPage'),
        requiresAuth: true,
        permissions: [Permissions.adminRoles],
    }
];

export default routes;
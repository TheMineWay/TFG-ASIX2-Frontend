import { BuildOutlined, DollarOutlined, HomeOutlined, InboxOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";
import { Permissions } from "../services/security/permissions";

export type MenuOption = {
    text: string;
    path?: string;
    children?: MenuOption[];
    key: string;
    icon?: JSX.Element;
    requiresAuth?: boolean;
    permissions?: Permissions[]
}

const menuOptions: MenuOption[] = [
    {
        text: 'main',
        path: '/',
        key: 'main',
        icon: <HomeOutlined />,
    },
    {
        text: 'admin',
        key: 'admin',
        icon: <ToolOutlined />,
        permissions: [Permissions.adminScreens],
        children: [
            {
                text: 'inventory',
                path: '/admin/inventory',
                key: 'inventory',
                icon: <InboxOutlined />,
                permissions: [Permissions.adminInventory],
            },
            {
                text: 'payments',
                path: '/admin/payments',
                key: 'adminPayments',
                icon: <DollarOutlined/>,
                permissions: [Permissions.adminPayments],
            },
            {
                text: 'users',
                path: '/admin/users',
                key: 'users',
                icon: <UserOutlined />,
                permissions: [Permissions.adminUsers],
            },
            {
                text: 'logs',
                path: '/admin/logs',
                key: 'logs',
                icon: <ToolOutlined />,
                permissions: [Permissions.viewLogs],
            },
        ],
    },
    {
        text: 'diskBuilder',
        path: '/disk-builder',
        key: 'disk-builder',
        icon: <BuildOutlined/>,
        requiresAuth: true,
    }
];

export default menuOptions;
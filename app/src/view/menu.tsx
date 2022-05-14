import { BarcodeOutlined, BuildOutlined, ContainerOutlined, DollarOutlined, HomeOutlined, InboxOutlined, ThunderboltOutlined, ToolOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
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
            {
                text: 'requests',
                path: '/admin/disk-requests',
                key: 'adminRequests',
                icon: <BarcodeOutlined/>,
                permissions: [Permissions.adminDiskRequests],
            },
            {
                text: 'contactForm',
                path: '/admin/contact-form',
                key: 'contactForm',
                icon: <ContainerOutlined/>,
                permissions: [Permissions.adminContactForm],
            }
        ],
    },
    {
        text: 'requests',
        key: 'requests',
        icon: <ThunderboltOutlined/>,
        requiresAuth: true,
        children: [
            {
                text: 'diskRequest',
                path: '/disk-request',
                key: 'disk-request',
                icon: <BuildOutlined/>,
                requiresAuth: true,
            },
            {
                text: 'requestsList',
                key: 'requestsList',
                path: '/disk-request/list',
                icon: <UnorderedListOutlined/>,
                requiresAuth: true,
            },
        ],
    },
];

export default menuOptions;
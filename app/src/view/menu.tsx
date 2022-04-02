import { HomeOutlined, ToolOutlined } from "@ant-design/icons";
import { Permissions } from "../services/security/permissions";

export type MenuOption = {
    text: string;
    path?: string;
    children?: MenuOption[];
    key: string;
    icon?: JSX.Element;
    permissions?: Permissions[]
}

const menuOptions: MenuOption[] = [
    {
        text: 'main',
        path: '/',
        key: 'main',
        icon: <HomeOutlined/>,
    },
    {
        text: 'logs',
        path: '/admin/logs',
        key: 'logs',
        icon: <ToolOutlined/>,
        permissions: [ Permissions.viewLogs ]
    },
];

export default menuOptions;
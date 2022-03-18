import { HomeOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";

export type MenuOption = {
    text: string;
    path?: string;
    children?: MenuOption[];
    key: string;
    icon?: JSX.Element;
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
    },
];

export default menuOptions;
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
        text: 'main',
        path: '/admin/logs',
        key: 'main',
        icon: <ToolOutlined/>,
    },
];

export default menuOptions;
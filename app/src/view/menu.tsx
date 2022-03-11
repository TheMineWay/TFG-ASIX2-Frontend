import { HomeOutlined, UserOutlined } from "@ant-design/icons";

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
        text: 'login',
        path: '/login',
        key: 'login',
        icon: <UserOutlined/>,
    },
];

export default menuOptions;
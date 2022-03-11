export type MenuOption = {
    text: string;
    path?: string;
    children?: MenuOption[];
    key: string;
}

const menuOptions: MenuOption[] = [
    {
        text: 'main',
        path: '/',
        key: 'main',
    },
];

export default menuOptions;
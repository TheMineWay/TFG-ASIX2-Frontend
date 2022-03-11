type Route = {
    path: string;
    loader: () => any;
    requiresAuth?: boolean;
};

const routes: Route[] = [
    {
        path: '/',
        loader: () => import('../view/mainPage/MainPage'),
    },
    {
        path: '/login',
        loader: () => import('../view/login/LoginPage'),
    },
    {
        path: '*',
        loader: () => import('../view/errors/404'),
    },
];

export default routes;
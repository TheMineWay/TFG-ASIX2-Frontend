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
        path: '*',
        loader: () => import('../view/errors/404'),
    },
    {
        path: '/admin/logs',
        loader: () => import('../view/logs/ViewLogsPage'),
        requiresAuth: true,
    }
];

export default routes;
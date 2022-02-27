type Route = {
    path: string;
    loader: () => any;
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
];

export default routes;
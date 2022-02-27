type Route = {
    path: string;
    loader: () => any;
};

const routes: Route[] = [
    {
        path: '/',
        loader: () => import('../view/mainPage/MainPage')
    },
];

export default routes;
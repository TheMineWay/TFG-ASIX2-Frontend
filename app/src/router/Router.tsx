import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useAuthState from '../hooks/auth/useAuthState';
import BaseLayout from '../view/layout/Layout';
import LoadingRoute from './LoadingRoute';
import routes from './routes';

export default function Router() {
    const [authState] = useAuthState();

    const isAuthenticated: boolean = authState ? true : false;
    const unauthenticatedComponent = React.lazy(() => import('../view/errors/Unauthenticated'))

    return (
        <BrowserRouter>
            <BaseLayout>
                <Suspense fallback={<LoadingRoute />}>
                    <Routes>
                        {
                            routes.map((route) => {
                                const LazyComponent = isAuthenticated || !route.requiresAuth ? React.lazy(route.loader) : unauthenticatedComponent;

                                return (
                                    <Route path={route.path} element={<LazyComponent />} />
                                );
                            })
                        }
                    </Routes>
                </Suspense>
            </BaseLayout>
        </BrowserRouter>
    );
}
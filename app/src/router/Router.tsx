import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingRoute from './LoadingRoute';
import routes from './routes';

export default function Router() {
    const isAuthenticated: boolean = false; // Implement auth detection
    const unauthenticatedComponent = React.lazy(() => import('../view/errors/Unauthenticated'))

    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map((route) => {
                        const LazyComponent = isAuthenticated || !route.requiresAuth ? React.lazy(route.loader) : unauthenticatedComponent;

                        return (
                            <Route path={route.path} key={route.path} element={
                                <Suspense key={route.path} fallback={<LoadingRoute />}>
                                    <LazyComponent />
                                </Suspense>
                            } />
                        );
                    })
                }
            </Routes>
        </BrowserRouter>
    );
}
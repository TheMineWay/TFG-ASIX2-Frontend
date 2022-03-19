import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useAuthState from '../hooks/auth/useAuthState';
import useSecurityState from '../hooks/security/useSecurityState';
import BaseLayout from '../view/layout/Layout';
import LoadingRoute from './LoadingRoute';
import routes from './routes';

export default function Router() {
    const [authState] = useAuthState();
    const [securityState] = useSecurityState();

    const isAuthenticated: boolean = authState ? true : false;
    const unauthenticatedComponent = React.lazy(() => import('../view/errors/Unauthenticated'));
    const NoPermissionsComponent = React.lazy(() => import('../view/errors/NoPermissions'));

    return (
        <BrowserRouter>
            <BaseLayout>
                <Suspense fallback={<LoadingRoute />}>
                    <Routes>
                        {
                            routes.map((route) => {
                                const LazyComponent = isAuthenticated || !route.requiresAuth ? React.lazy(route.loader) : unauthenticatedComponent;

                                if((route.requiresAuth && isAuthenticated) && route.permissions) {
                                    for(const permission of route.permissions) {
                                        if(!(securityState?.permissions.includes(permission))) {
                                            return (
                                                <Route path={route.path} element={<NoPermissionsComponent/>} />
                                            );
                                        }
                                    }
                                }

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
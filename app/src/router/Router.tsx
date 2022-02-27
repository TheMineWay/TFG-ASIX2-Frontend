import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingRoute from './LoadingRoute';
import routes from './routes';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map((route) => {

                        const LazyComponent = React.lazy(route.loader);

                        return (
                            <Route path={route.path} key={route.path} element={
                                <Suspense key={route.path} fallback={<LoadingRoute />}>
                                    <LazyComponent/>
                                </Suspense>
                            }/>
                        );
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}
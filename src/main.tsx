import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LayoutContainer} from "./layout";
import {type appRoute, appRoutes} from "./routes.tsx";
import type {JSX} from "react";

import "./i18n/i18n";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <LayoutContainer>
            <Routes>
                <Route index element={<Navigate to="/main" replace />} />
                {appRoutes.map(({ path, element, children }: appRoute): JSX.Element => (
                    <Route key={path} path={path} element={element}>
                        {children?.map(({ path, element }: appRoute): JSX.Element => (
                            <Route key={path} path={path.replace(`${path}/`, "")} element={element} />
                        ))}
                    </Route>
                ))}
            </Routes>
        </LayoutContainer>
    </BrowserRouter>
)

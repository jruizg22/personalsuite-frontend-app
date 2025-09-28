import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LayoutContainer} from "./layout";
import {appRoutes} from "./routes.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <LayoutContainer>
            <Routes>
                <Route>
                    <Route index element={<Navigate to="/main" replace/>}/>
                    {appRoutes.map(({path, element}) => (
                        <Route key={path} path={path} element={element}/>
                    ))}
                </Route>
            </Routes>
        </LayoutContainer>
    </BrowserRouter>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./routes/login.tsx";
import RegisterPage from "./routes/register.tsx";
import AccountRecoveryPage from "./routes/account-recovery.tsx";
import ActivateAccountPage from "./routes/ActivateAccountPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "/account-recovery",
        element: <AccountRecoveryPage/>,
    },
    {
        path: "/activate-account/:token",
        element: <ActivateAccountPage/>,
    },
    {
        path: "/reset-password/:token",
        element: <div>Reset Password</div>,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./routes/login.tsx";
import RegisterPage from "./routes/register.tsx";
import AccountRecoveryPage from "./routes/account-recovery.tsx";
import ActivateAccountPage from "./routes/ActivateAccountPage.tsx";
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

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
    },
    {
        path: "/home",
        element: <div>Hello world</div>,
    }
]);

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        }
    }
});


export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,

)

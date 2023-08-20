import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import LoginPage from "./routes/Login.tsx";
import {RegisterPage, RegisterSuccessfulPage} from "./routes/Register.tsx";
import AccountRecoveryPage from "./routes/AccountRecovery.tsx";
import ActivateAccountPage from "./routes/ActivateAccount.tsx";
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {activateAccountLoader, authLoader, rootLoader} from "./lib/controllers/router/root-loader.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet/>,
        loader: ({request}) => {
            return rootLoader(request);
        },
        children: [
            {
                path: "auth",
                element: <Outlet/>,
                loader: ({request}) => {
                    return authLoader(request);
                },
                children: [
                    {
                        path: "login",
                        element: <LoginPage/>,
                    },
                    {
                        path: "register",
                        element: <RegisterPage/>,

                    },
                    {
                        path: "register/successful",
                        element: <RegisterSuccessfulPage/>,
                    },
                    {
                        path: "account-recovery",
                        element: <AccountRecoveryPage/>,
                    },
                    {
                        path: "activate-account",
                        element: <Outlet/>,
                        loader: ({request}) => {
                            return activateAccountLoader(request);
                        },
                        children: [
                            {
                                path: ":token",
                                element: <ActivateAccountPage/>,
                            }
                        ]
                    },
                    {
                        path: "reset-password",
                        element: <Outlet/>,
                        loader: ({request}) => {
                            return activateAccountLoader(request);
                        },
                        children: [
                            {
                                path: ":token",
                                element: <div>Reset Password</div>,
                            }
                        ]
                    },
                    {
                        path: "reset-password/:token",
                        element: <div>Reset Password</div>,
                    }
                ]
            },
            {
                path: "home",
                element: <div>Hello world</div>,
            }
        ]
    },
]);

const httpLink = createHttpLink({
    uri: 'http://localhost:7778/query',
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
    // uri: 'http://localhost:7778/query',
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)

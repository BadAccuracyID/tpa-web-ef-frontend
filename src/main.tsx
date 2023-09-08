import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import LoginPage from "./routes/auth/Login.tsx";
import {RegisterPage, RegisterSuccessfulPage} from "./routes/auth/Register.tsx";
import AccountRecoveryPage from "./routes/auth/AccountRecovery.tsx";
import ActivateAccountPage from "./routes/auth/ActivateAccount.tsx";
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {activateAccountLoader, authLoader, rootLoader} from "./lib/loader/root-loader.ts";
import {userLoader} from "./lib/loader/user-loader.ts";
import HomePage from "./routes/home/Home.tsx";
import {ToastContainer} from "react-toastify";

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
                loader: () => {
                    return userLoader();
                },
                element: <HomePage/>,
            }
        ]
    },
]);

const httpLink = createHttpLink({
    uri: 'http://localhost:7778/query',
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
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
        <ToastContainer />
    </React.StrictMode>,
)

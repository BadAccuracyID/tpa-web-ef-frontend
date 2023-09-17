/* eslint-disable no-var */
// noinspection ES6ConvertVarToLetConst

import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import LoginPage from "./routes/auth/Login.tsx";
import {RegisterPage, RegisterSuccessfulPage} from "./routes/auth/Register.tsx";
import AccountRecoveryPage from "./routes/auth/AccountRecovery.tsx";
import ActivateAccountPage from "./routes/auth/ActivateAccount.tsx";
import {ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {activateAccountLoader, authLoader, profileLoader, rootLoader} from "./lib/loader/root-loader.ts";
import {userLoader} from "./lib/loader/user-loader.ts";
import HomePage from "./routes/home/Home.tsx";
import {ToastContainer} from "react-toastify";
import MessengerPage from "./routes/messenger/Messenger.tsx";
import ProfilePage from "./routes/profile/Profile.tsx";
import SearchPage from "./routes/search/Search.tsx";
import FriendsPage from "./routes/friend/FriendsPage.tsx";

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
            },
            {
                path: "profile",
                loader: ({request}) => {
                    return profileLoader(request);
                },
                element: <Outlet/>,
                children: [
                    {
                        path: ":id",
                        loader: () => {
                            return userLoader();
                        },
                        element: <ProfilePage/>,
                    }
                ]
            },
            {
                path: "messenger",
                loader: () => {
                    return userLoader();
                },
                element: <MessengerPage/>,
            },
            {
                path: "search",
                loader: () => {
                    return userLoader();
                },
                element: <SearchPage/>,
            },
            {
                path: "friends",
                loader: () => {
                    return userLoader();
                },
                element: <FriendsPage/>,
            },
        ]
    },
]);

var cachedApolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function getApolloClient() {
    const httpLink = createHttpLink({
        uri: 'http://localhost:7778/query',
    });

    const authLink = setContext((_, {headers}) => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                ...headers,
                authorization: token ? token : "",
            }
        }
    });

    if (cachedApolloClient === null) {
        cachedApolloClient = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });
    }

    return cachedApolloClient;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        <ToastContainer/>
    </React.StrictMode>,
)

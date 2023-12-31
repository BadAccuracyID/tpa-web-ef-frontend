/* eslint-disable no-var */
// noinspection ES6ConvertVarToLetConst

import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import LoginPage from "./routes/auth/Login.tsx";
import {RegisterPage, RegisterSuccessfulPage} from "./routes/auth/Register.tsx";
import AccountRecoveryPage from "./routes/auth/AccountRecovery.tsx";
import ActivateAccountPage from "./routes/auth/ActivateAccount.tsx";
import {ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {
    activateAccountLoader,
    authLoader,
    postLoader,
    profileLoader,
    resetPasswordLoader,
    rootLoader
} from "./lib/loader/root-loader.ts";
import {userLoader} from "./lib/loader/user-loader.ts";
import HomePage from "./routes/home/Home.tsx";
import {ToastContainer} from "react-toastify";
import MessengerPage from "./routes/messenger/Messenger.tsx";
import ProfilePage from "./routes/profile/Profile.tsx";
import SearchPage from "./routes/search/Search.tsx";
import FriendsPage from "./routes/friend/Friends.tsx";
import NotificationPage from "./routes/notification/Notification.tsx";
import PostPage from "./routes/post/Post.tsx";
import GroupsPage from "./routes/group/Groups.tsx";
import PasswordResetPage from "./routes/auth/PasswordReset.tsx";
import StoryPage from "./routes/story/Story.tsx";
import CreateStoryPage from "./routes/story/CreateStory.tsx";
import ReelsPage from "./routes/reels/Reels.tsx";
import {ThemeProvider} from "./lib/theme/ThemeProvider.tsx";
import CreateReelsPage from "./routes/reels/CreateReels.tsx";

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
                            return resetPasswordLoader(request);
                        },
                        children: [
                            {
                                path: ":token",
                                element: <PasswordResetPage/>,
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
                path: "post",
                loader: ({request}) => {
                    return postLoader(request);
                },
                element: <Outlet/>,
                children: [
                    {
                        path: ":id",
                        loader: () => {
                            return userLoader();
                        },
                        element: <PostPage/>
                    }
                ]
            },
            {
                path: "groups",
                loader: () => {
                    return userLoader();
                },
                element: <GroupsPage/>,
                children: [
                    {
                        path: ":groupId",
                        element: <Outlet/>,
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
            {
                path: "notifications",
                loader: () => {
                    return userLoader();
                },
                element: <NotificationPage/>,
            },
            {
                path: "story",
                loader: () => {
                    return userLoader();
                },
                element: <StoryPage/>,
            },
            {
                path: "story-create",
                loader: () => {
                    return userLoader();
                },
                element: <
                    CreateStoryPage/>,
            },
            {
                path: "reels",
                loader: () => {
                    return userLoader();
                },
                element: <ReelsPage/>,
            },
            {
                path: "reels-create",
                loader: () => {
                    return userLoader();
                },
                element: <CreateReelsPage/>,
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
    <ThemeProvider>
        <RouterProvider router={router}/>
        <ToastContainer/>
    </ThemeProvider>
)

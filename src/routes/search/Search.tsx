import {Await, useLoaderData, useSearchParams} from "react-router-dom";
import NavigationBar from "../../components/NavigationBar.tsx";
import {Post, SearchResult, User} from "../../lib/gql/graphql.ts";
import "../../styles/search.scss";
import {Suspense, useState} from "react";
import {searchQuery} from "../../lib/controllers/search-controller.ts";
import {FullPageLoading} from "../../components/loading/LoadingComponents.tsx";
import {AiFillHome, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd} from "react-icons/ai";
import {FriendCard} from "../../components/friends/FriendComponent.tsx";
import {PostComponent} from "../../components/post/PostComponent.tsx";

enum MenuPage {
    ALL,
    PROFILE,
    POST,
    GROUP
}

export default function SearchPage() {
    const currentUser = useLoaderData() as User;
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<MenuPage>(MenuPage.ALL);

    function changePage(page: MenuPage) {
        setPage(page);
    }

    async function search(): Promise<SearchResult[] | null> {
        const query = searchParams.get("q");
        if (query === null) {
            return null;
        }

        const result = await searchQuery(query);
        if (!result.success) {
            return null;
        }

        return result.data!;
    }

    return (
        <div>
            <NavigationBar user={currentUser}/>

            <div className="search">
                <div className="search-left">
                    <div className="search-left-header">
                        <div className="search-left-header-text">
                            Search Results
                        </div>
                        <br/>
                    </div>

                    <div className="search-left-buttons">
                        <div className="search-left-buttons-container"
                             onClick={() => changePage(MenuPage.ALL)}>
                            <AiFillHome
                                className={"search-left-buttons-icon" + (page === MenuPage.ALL ? "-active" : "")}/>
                            <div>All</div>
                        </div>
                        <div className="search-left-buttons-container"
                             onClick={() => changePage(MenuPage.PROFILE)}>
                            <AiOutlineUserAdd
                                className={"search-left-buttons-icon" + (page === MenuPage.PROFILE ? "-active" : "")}/>
                            <div>Profiles</div>
                        </div>
                        <div className="search-left-buttons-container"
                             onClick={() => changePage(MenuPage.POST)}>
                            <AiOutlineUsergroupAdd
                                className={"search-left-buttons-icon" + (page === MenuPage.POST ? "-active" : "")}/>
                            <div>Posts</div>
                        </div>
                        <div className="search-left-buttons-container"
                             onClick={() => changePage(MenuPage.GROUP)}>
                            <AiOutlineUser
                                className={"search-left-buttons-icon" + (page === MenuPage.GROUP ? "-active" : "")}/>
                            <div>Groups</div>
                        </div>
                    </div>
                </div>

                <div className="search-content">
                    <Suspense fallback={<FullPageLoading/>}>
                        <Await resolve={search()}>
                            {(result) => {
                                if (!result) {
                                    return <h1>Nothing found</h1>
                                }

                                const users = result.filter((item: SearchResult) => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    return item['__typename'] === "User";
                                });
                                const posts = result.filter((item: SearchResult) => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    return item['__typename'] === "Post";
                                });
                                const groups = result.filter((item: SearchResult) => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    return item['__typename'] === "Group";
                                });

                                console.log(users.length)

                                switch (page) {
                                    case MenuPage.ALL:
                                        return (
                                            <div>
                                                {(users.length > 0) ?
                                                    <div>
                                                        <h1>Profiles</h1>
                                                    </div> : <></>
                                                }
                                                <div className="search-content-row">
                                                    {users.map((item: SearchResult) => {
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-ignore
                                                        const user = item as User;
                                                        return <FriendCard user={user}
                                                                           currentUser={currentUser}/>
                                                    })}
                                                </div>

                                                {posts.length > 0 ?
                                                    <div>
                                                        <h1>Posts</h1>
                                                    </div> : <></>
                                                }
                                                <div className="search-content-column">
                                                    {posts.map((item: SearchResult) => {
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-ignore
                                                        const post = item as Post;
                                                        return <PostComponent
                                                            post={post}
                                                            user={currentUser}
                                                            onRemovePost={() => {
                                                            }}
                                                        />
                                                    })}
                                                </div>

                                                {groups.length > 0 ?
                                                    <div>
                                                        <h1>Groups</h1>
                                                    </div> : <></>
                                                }
                                            </div>
                                        )
                                    case MenuPage.PROFILE:
                                        return (
                                            <div>
                                                <h1>Users</h1>
                                                <div className="search-content-row">
                                                    {users.map((item: SearchResult) => {
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-ignore
                                                        const user = item as User;
                                                        return <FriendCard user={user} currentUser={currentUser}/>
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    case MenuPage.POST:
                                        return (
                                            <div>
                                                <h1>Posts</h1>
                                                <div className="search-content-column">
                                                    {posts.map((item: SearchResult) => {
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-ignore
                                                        const post = item as Post;
                                                        return <PostComponent
                                                            post={post}
                                                            user={currentUser}
                                                            onRemovePost={() => {
                                                            }}
                                                        />
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    case MenuPage.GROUP:
                                        break;
                                }
                                return <></>
                            }}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

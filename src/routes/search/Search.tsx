import {Await, useLoaderData, useNavigate, useSearchParams} from "react-router-dom";
import NavigationBar from "../../components/NavigationBar.tsx";
import {Group, Post, SearchResult, User} from "../../lib/gql/graphql.ts";
import "../../styles/search.scss";
import {Suspense, useState} from "react";
import {searchQuery} from "../../lib/controllers/search-controller.ts";
import {BiSolidUserCircle} from "react-icons/bi";
import {FullPageLoading} from "../../components/loading/LoadingComponents.tsx";
import {AiFillHome, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd} from "react-icons/ai";

enum MenuPage {
    ALL,
    PROFILE,
    POST,
    GROUP
}

export default function SearchPage() {
    const navigate = useNavigate();
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

    function redirectProfile(user: User) {
        navigate('/profile/' + user.id);
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

                                return result
                                    .filter((item: SearchResult) => {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        const userType: string = item['__typename'];
                                        if (userType === "User") {
                                            return page === MenuPage.ALL || page === MenuPage.PROFILE;
                                        } else if (userType === "Post") {
                                            return page === MenuPage.ALL || page === MenuPage.POST;
                                        } else if (userType === "Group") {
                                            return page === MenuPage.ALL || page === MenuPage.GROUP;
                                        } else {
                                            return false;
                                        }
                                    })
                                    .map((item: SearchResult) => {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        const userType: string = item['__typename'];
                                        if (userType === "User") {
                                            const user = item as User;
                                            return (
                                                <div className="search-content search-content-user" onClick={() => {
                                                    redirectProfile(user)
                                                }}>
                                                    {user.profilePicture ?
                                                        <img
                                                            src={user.profilePicture!}
                                                            className="search-content-user-picture"
                                                            alt="Profile picture"
                                                        />
                                                        :
                                                        <BiSolidUserCircle
                                                            className="search-content-user-null-picture"/>
                                                    }
                                                    <div className="search-content-user-info">
                                                        <div className="search-content-user-info-name">
                                                            {user.firstName} {user.lastName}
                                                        </div>

                                                        <div className="search-content-user-info-username">
                                                            {user.username}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else if (userType === "Post") {
                                            const post = item as Post;
                                            return (
                                                <div>
                                                    <h1>{post.title}</h1>
                                                </div>
                                            )
                                        } else if (userType === "Group") {
                                            const group = item as Group;
                                            return (
                                                <div>
                                                    <h1>{group.name}</h1>
                                                </div>
                                            )
                                        } else {
                                            return <div>Null</div>
                                        }
                                    });
                            }}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

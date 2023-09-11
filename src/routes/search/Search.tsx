import {Await, useLoaderData, useNavigate, useSearchParams} from "react-router-dom";
import NavigationBar from "../../components/NavigationBar.tsx";
import {Group, Post, SearchResult, User} from "../../lib/gql/graphql.ts";
import "../../styles/search.scss";
import {Suspense} from "react";
import {searchQuery} from "../../lib/controllers/search-controller.ts";
import {BiSolidUserCircle} from "react-icons/bi";

export default function SearchPage() {
    const navigate = useNavigate();
    const currentUser = useLoaderData() as User;
    const [searchParams] = useSearchParams();

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
        //'/profile/' + user.id
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
                </div>

                <div className="search-content">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await resolve={search()}>
                            {(result) => {
                                if (!result) {
                                    return <div>Nothing found</div>
                                }

                                return result.map((item: SearchResult) => {
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
                                                    <BiSolidUserCircle className="search-content-user-null-picture"/>
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

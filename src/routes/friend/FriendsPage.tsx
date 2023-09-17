import {useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import {
    AllFriendsComponent,
    FavoriteFriendsComponent,
    FriendRecommendationComponent,
    FriendRequestsComponent
} from "../../components/friends/FriendComponent.tsx";
import {useState} from "react";
import {AiFillHome, AiFillStar, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd} from "react-icons/ai";

enum MenuPage {
    HOME,
    PENDING,
    RECOMENDATION,
    FRIENDS,
    FAVORITES,
}

export default function FriendsPage() {
    const currentUser = useLoaderData() as User;
    const [page, setPage] = useState<MenuPage>(MenuPage.HOME);

    function changePage(page: MenuPage) {
        setPage(page);
    }

    return (
        <div>
            <NavigationBar user={currentUser}/>


            <div className="friends">
                <div className="friends-left">
                    <div className="friends-left-header">
                        <div className="friends-left-header-text">
                            Friends
                        </div>
                        <br/>
                    </div>

                    <div className="friends-left-buttons">
                        <div className="friends-left-buttons-container"
                             onClick={() => changePage(MenuPage.HOME)}>
                            <AiFillHome
                                className={"friends-left-buttons-icon" + (page === MenuPage.HOME ? "-active" : "")}/>
                            <div>Home</div>
                        </div>
                        <div className="friends-left-buttons-container"
                             onClick={() => changePage(MenuPage.PENDING)}>
                            <AiOutlineUserAdd
                                className={"friends-left-buttons-icon" + (page === MenuPage.PENDING ? "-active" : "")}/>
                            <div>Pending</div>
                        </div>
                        <div className="friends-left-buttons-container"
                             onClick={() => changePage(MenuPage.RECOMENDATION)}>
                            <AiOutlineUsergroupAdd
                                className={"friends-left-buttons-icon" + (page === MenuPage.RECOMENDATION ? "-active" : "")}/>
                            <div>Recommendation</div>
                        </div>
                        <div className="friends-left-buttons-container"
                             onClick={() => changePage(MenuPage.FRIENDS)}>
                            <AiOutlineUser
                                className={"friends-left-buttons-icon" + (page === MenuPage.FRIENDS ? "-active" : "")}/>
                            <div>Friends</div>
                        </div>
                        <div className="friends-left-buttons-container"
                             onClick={() => changePage(MenuPage.FAVORITES)}>
                            <AiFillStar
                                className={"friends-left-buttons-icon" + (page === MenuPage.FAVORITES ? "-active" : "")}/>
                            <div>Favorites</div>
                        </div>
                    </div>
                </div>


                <div className="friends-content">
                    <PageContent currentUser={currentUser} page={page}/>
                </div>
            </div>
        </div>
    )
}

function PageContent({currentUser, page}: { currentUser: User, page: MenuPage }) {
    switch (page) {
        case MenuPage.HOME:
            return (
                <div>
                    <FriendRequestsComponent currentUser={currentUser}/>
                    <FriendRecommendationComponent currentUser={currentUser}/>
                    <AllFriendsComponent user={currentUser} currentUser={currentUser}/>
                    <FavoriteFriendsComponent user={currentUser} currentUser={currentUser}/>
                </div>
            )
        case MenuPage.PENDING:
            return (<FriendRequestsComponent currentUser={currentUser}/>)
        case MenuPage.RECOMENDATION:
            return (<FriendRecommendationComponent currentUser={currentUser}/>)
        case MenuPage.FRIENDS:
            return (<AllFriendsComponent user={currentUser} currentUser={currentUser}/>)
        case MenuPage.FAVORITES:
            return (<FavoriteFriendsComponent user={currentUser} currentUser={currentUser}/>)
    }
}

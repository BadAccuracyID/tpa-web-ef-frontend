import {useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import {FriendRequestsComponent} from "../../components/friends/FriendComponent.tsx";

export default function FriendsPage() {
    const currentUser = useLoaderData() as User;

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
                </div>


                <div className="friends-content">
                    <FriendRequestsComponent/>
                </div>
            </div>
        </div>
    )
}

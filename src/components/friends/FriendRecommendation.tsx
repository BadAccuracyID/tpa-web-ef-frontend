import {useCallback, useEffect, useState} from "react";
import {RelationshipStatus, User} from "../../lib/gql/graphql.ts";
import "../../styles/friends.scss";
import {
    changeFriendshipStatus,
    getFriendRecommendations,
    sendFriendRequest
} from "../../lib/controllers/relationship-controller.ts";
import {BiBlock, BiSolidUserCircle, BiSolidUserPlus} from "react-icons/bi";
import {toast} from "react-toastify";

export default function FriendRecommendationComponent() {
    const [friends, setFriends] = useState<User[]>([])

    const loadRecommendations = useCallback(async () => {
        const fetched = await getFriendRecommendations();

        if (!fetched.success) {
            return
        }

        const recommendations = fetched.data!.filter(it => it.activated);

        // cut if more than 5
        if (recommendations.length > 5) {
            recommendations.splice(5, recommendations.length - 5)
        }

        setFriends(recommendations);
    }, []);

    useEffect(() => {
        loadRecommendations();
    }, []);

    return (
        <div className="recommendation">
            <div className="recommendation-text">
                People you may know
            </div>
            <div className="recommendation-list">
                {friends.map((it) => {
                    return <FriendCard user={it}/>
                })}
            </div>
        </div>

    )
}

function FriendCard({user}: { user: User }) {
    const profilePicture = user.profilePicture;

    async function onAddFriend() {
        const result = await sendFriendRequest(user.id);
        if (!result.success) {
            toast.error('Failed to send friend request', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Friend request sent', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    async function onBlock() {
        const result = await changeFriendshipStatus(user.id, RelationshipStatus.Blocked);
        if (!result.success) {
            toast.error('Failed to block user', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Blocked user', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    return (
        <div className="card">
            <div className="card-container">
                {profilePicture ? <img className="card-profile-picture" src={profilePicture}/> :
                    <BiSolidUserCircle className="card-profile-picture-null"/>}

                <div className="card-name">
                    {user.firstName} {user.lastName}
                </div>

                <div className="card-buttons">
                    <div className="card-buttons-add" onClick={onAddFriend}>
                        <BiSolidUserPlus className="card-buttons-icon"/>
                        <div>
                            Add Friend
                        </div>
                    </div>

                    <div className="card-buttons-block" onClick={onBlock}>
                        <BiBlock className="card-buttons-icon"/>
                        <div>
                            Remove
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

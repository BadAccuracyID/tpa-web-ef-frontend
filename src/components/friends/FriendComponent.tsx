import {useCallback, useEffect, useState} from "react";
import {RelationshipStatus, User} from "../../lib/gql/graphql.ts";
import "../../styles/friends.scss";
import {
    acceptFriendRequest,
    changeFriendshipStatus,
    getFriendRecommendations,
    getFriendRequests,
    rejectFriendRequest,
    sendFriendRequest
} from "../../lib/controllers/relationship-controller.ts";
import {BiBlock, BiSolidUserCircle, BiSolidUserPlus} from "react-icons/bi";
import {toast} from "react-toastify";
import {AiFillStar} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

export function FriendRecommendationComponent({currentUser}: { currentUser: User }) {
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

    if (friends.length == 0) {
        return <></>
    }

    return (
        <div className="recommendation">
            <div className="recommendation-text">
                People you may know
            </div>
            <div className="recommendation-list">
                {friends.map((it) => {
                    return <FriendCard user={it} currentUser={currentUser}/>
                })}
            </div>
        </div>
    )
}

export function FriendRequestsComponent() {
    const [friends, setFriends] = useState<User[]>([])

    const loadRequests = useCallback(async () => {
        const fetched = await getFriendRequests();
        if (!fetched.success) {
            return
        }

        const recommendations = fetched.data!
            .map(it => it.fromUser!)
            .filter(it => it.activated);

        setFriends(recommendations);
    }, []);

    useEffect(() => {
        loadRequests();
    }, []);

    if (friends.length == 0) {
        return <></>
    }

    return (
        <div className="recommendation">
            <div className="recommendation-text">
                Friend Requests
            </div>
            <div className="recommendation-list">
                {friends.map((it) => {
                    return <FriendRequestCard user={it}/>
                })}
            </div>
        </div>
    )
}

export function AllFriendsComponent({user, currentUser}: { user: User, currentUser: User }) {
    const [friends, setFriends] = useState<User[]>([])

    useEffect(() => {
        const friendRelations = user.relations!
            .filter((it) => it.status === RelationshipStatus.Friends || it.status === RelationshipStatus.Favorite)
            .map((it) => it.user);

        setFriends(friendRelations)
    }, []);

    if (friends.length == 0) {
        return <></>
    }

    return (
        <div className="recommendation">
            <div className="recommendation-text">
                Friends
            </div>
            <div className="recommendation-list">
                {friends.map((it) => {
                    return <FriendCard user={it} currentUser={currentUser}/>
                })}
            </div>
        </div>
    )
}

export function FavoriteFriendsComponent({user, currentUser}: { user: User, currentUser: User }) {
    const [friends, setFriends] = useState<User[]>([])

    useEffect(() => {
        const friendRelations = user.relations!
            .filter((it) => it.status === RelationshipStatus.Favorite)
            .map((it) => it.user);

        setFriends(friendRelations)
    }, []);

    if (friends.length == 0) {
        return <></>
    }

    return (
        <div className="recommendation">
            <div className="recommendation-text">
                Favorite Friends
            </div>
            <div className="recommendation-list">
                {friends.map((it) => {
                    return <FriendCard user={it} currentUser={currentUser}/>
                })}
            </div>
        </div>
    )
}

export function FriendCard({user, currentUser}: { user: User, currentUser: User }) {
    const navigate = useNavigate();
    const profilePicture = user.profilePicture;

    function isFriends() {
        if (!currentUser.relations) {
            return false;
        }

        return currentUser.relations
            .filter(it => it.status === RelationshipStatus.Friends || it.status === RelationshipStatus.Favorite)
            .map(it => it.user!.id)
            .includes(user.id);
    }

    function isFavorite() {
        if (!currentUser.relations) {
            return false;
        }

        return currentUser.relations
            .filter(it => it.status === RelationshipStatus.Favorite)
            .map(it => it.user!.id)
            .includes(user.id);
    }

    function isSelf() {
        return currentUser.id === user.id;
    }

    function redirectProfile() {
        navigate('/profile/' + user.id);
    }

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

    async function onAddToFavorite() {
        const result = await changeFriendshipStatus(user.id, RelationshipStatus.Favorite);
        if (!result.success) {
            toast.error('Failed to add to favorites', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Added to favorites', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    async function onSetToJustFriends() {
        const result = await changeFriendshipStatus(user.id, RelationshipStatus.Friends);
        if (!result.success) {
            toast.error('Failed to remove from favorites', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Removed from favorites', {
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
            <div className="card-container" onClick={redirectProfile}>
                {profilePicture ? <img className="card-profile-picture" src={profilePicture}/> :
                    <BiSolidUserCircle className="card-profile-picture-null"/>}

                <div className="card-name">
                    {user.firstName} {user.lastName}
                </div>

                <div className="card-buttons">
                    {(!isFriends() && !isSelf()) ?
                        <div className="card-buttons-add" onClick={onAddFriend}>
                            <BiSolidUserPlus className="card-buttons-icon"/>
                            <div>
                                Add Friend
                            </div>
                        </div> : <></>
                    }

                    {(isFriends() && !isFavorite()) ?
                        <div className="card-buttons-cf" onClick={onAddToFavorite}>
                            <AiFillStar className="card-buttons-icon"/>
                            <div>
                                Favorite
                            </div>
                        </div> : <></>
                    }

                    {(isFriends() && isFavorite()) ?
                        <div className="card-buttons-cf" onClick={onSetToJustFriends}>
                            <AiFillStar className="card-buttons-icon"/>
                            <div>
                                Unfavorite
                            </div>
                        </div> : <></>
                    }

                    {
                        !isSelf() ?
                            <div className="card-buttons-block" onClick={onBlock}>
                                <BiBlock className="card-buttons-icon"/>
                                <div>
                                    Block
                                </div>
                            </div> : <></>
                    }

                </div>
            </div>

        </div>
    )
}

export function FriendRequestCard({user}: { user: User }) {
    const navigate = useNavigate();
    const profilePicture = user.profilePicture;

    function redirectProfile() {
        navigate('/profile/' + user.id);
    }

    async function onAcceptFriendRequest() {
        const result = await acceptFriendRequest(user.id);
        if (!result.success) {
            toast.error('Failed to accept friend request', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Friend request accepted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    async function onRejectFriendRequest() {
        const result = await rejectFriendRequest(user.id);
        if (!result.success) {
            toast.error('Failed to reject friend request', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Friend request rejected', {
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
            <div className="card-container" onClick={redirectProfile}>
                {profilePicture ? <img className="card-profile-picture" src={profilePicture}/> :
                    <BiSolidUserCircle className="card-profile-picture-null"/>}

                <div className="card-name">
                    {user.firstName} {user.lastName}
                </div>

                <div className="card-buttons">
                    <div className="card-buttons-add" onClick={onAcceptFriendRequest}>
                        <BiSolidUserPlus className="card-buttons-icon"/>
                        <div>
                            Accept
                        </div>
                    </div>

                    <div className="card-buttons-cf" onClick={onRejectFriendRequest}>
                        <AiFillStar className="card-buttons-icon"/>
                        <div>
                            Decline
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


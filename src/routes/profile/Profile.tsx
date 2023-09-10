import {Await, useLoaderData, useParams} from "react-router-dom";
import {Suspense, useEffect, useState} from "react";
import {RelationshipStatus, User} from "../../lib/gql/graphql.ts";
import {getUserById} from "../../lib/controllers/user-controller.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/profile.scss";
import {BiBlock, BiSolidUserCircle, BiSolidUserPlus} from "react-icons/bi";
import {FullPageLoading} from "../../components/loading/LoadingComponents.tsx";
import {AiFillMessage, AiFillStar} from "react-icons/ai";
import {BsPencilFill} from "react-icons/bs";
import {
    acceptFriendRequest,
    getFriendRequests,
    sendFriendRequest
} from "../../lib/controllers/relationship-controller.ts";
import {toast} from "react-toastify";
import {HiXMark} from "react-icons/hi2";

const nullUser: User = {
    id: '',
    username: '',
    activated: false,
    dateOfBirth: "",
    email: "",
    firstName: "User not found",
    lastName: "",
    gender: "",
}

export default function ProfilePage() {
    const currentUser = useLoaderData() as User;
    const {id} = useParams();

    async function getUser(): Promise<User> {
        if (!id) {
            return nullUser;
        }

        const response = await getUserById(id);
        if (!response.success) {
            return nullUser;
        }

        return response.data!;
    }

    useEffect(() => {
        getUser();
    }, []);

    function getFriends(user: User): User[] {
        if (!user.relations) {
            return [];
        }

        return user.relations
            .filter(relation => {
                return relation.status === RelationshipStatus.Friends || relation.status === RelationshipStatus.Favorite;
            }).map(relation => {
                return relation.user!;
            }) ?? [];
    }

    function getMutualFriends(user: User): User[] {
        if (!user.relations || !currentUser.relations) {
            return [];
        }

        return getFriends(user).filter(friend => {
            return getFriends(currentUser).includes(friend);
        });
    }

    return (
        <div>
            <Suspense fallback={<FullPageLoading/>}>
                <Await resolve={getUser()}>
                    {(user: User) => {
                        return (
                            <div>
                                <NavigationBar user={currentUser}/>

                                <div className="profile">
                                    <div className="profile-header">
                                        <div className="profile-header-container">
                                            {user.profilePicture ?
                                                <img
                                                    src={user.profilePicture!}
                                                    className="profile-header-picture"
                                                    alt="Profile picture"
                                                />
                                                :
                                                <BiSolidUserCircle className="profile-header-null-picture"/>
                                            }

                                            <div className="profile-header-info">
                                                <div className="profile-header-info-name">
                                                    {user.firstName} {user.lastName}
                                                </div>

                                                <div className="profile-header-info-username">
                                                    {user.username}
                                                </div>

                                                <div className="profile-header-info-friends">
                                                    {getFriends(user).length} friends
                                                    | {getMutualFriends(user).length} mutual friends
                                                </div>
                                            </div>

                                            <Buttons friends={getFriends(user)}
                                                     currentUser={currentUser}
                                                     user={user}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Await>
            </Suspense>
        </div>
    );
}

function Buttons({friends, currentUser, user}: {
    friends: User[],
    currentUser: User,
    user: User
}) {
    const [pending, setPending] = useState<boolean>(false);

    function isSelf(): boolean {
        return user.id === currentUser.id;
    }

    function isFriends(): boolean {
        if (!user.relations) {
            return false;
        }

        if (isSelf()) {
            return true;
        }

        return friends.includes(currentUser);
    }

    function isFavorite(): boolean {
        if (!user.relations) {
            return false;
        }

        if (isSelf()) {
            return true;
        }

        return user.relations
            .filter(relation => {
                return relation.status === RelationshipStatus.Favorite;
            }).map(relation => {
                return relation.user!;
            }).includes(currentUser);
    }

    async function isPending(): Promise<boolean> {
        const result = await getFriendRequests();
        if (!result.success) {
            return false;
        }

        return result.data!.some((it) => {
            return it.to === user.id;
        })
    }

    useEffect(() => {
        isPending().then((result) => {
            setPending(result);
        });
    }, []);

    async function onSendFriendRequest() {
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
        const result = await acceptFriendRequest(user.id);
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
        <div className="profile-header-buttons">
            {(!isFriends() && !isSelf() && !pending) &&
                <div className="profile-header-buttons-add" onClick={onSendFriendRequest}>
                    <BiSolidUserPlus className="profile-header-buttons-icon"/>
                    <div>
                        Add Friend
                    </div>
                </div>
            }

            {(!isFriends() && !isSelf() && pending) &&
                <div className="profile-header-buttons-add" onClick={onAcceptFriendRequest}>
                    <BiSolidUserPlus className="profile-header-buttons-icon"/>
                    <div>
                        Accept Friend Request
                    </div>
                </div>
            }

            {(!isFriends() && !isSelf() && pending) &&
                <div className="profile-header-buttons-block" onClick={onRejectFriendRequest}>
                    <HiXMark className="profile-header-buttons-icon"/>
                    <div>
                        Reject Friend Request
                    </div>
                </div>
            }

            {(isFriends() && !isFavorite()) &&
                <div className="profile-header-buttons-cf">
                    <AiFillStar className="profile-header-buttons-icon"/>
                    <div>
                        Add to Favorites
                    </div>
                </div>
            }

            {isFriends() &&
                <div className="profile-header-buttons-message">
                    <AiFillMessage className="profile-header-buttons-icon"/>
                    <div>
                        Message
                    </div>
                </div>
            }

            {isSelf() &&
                <div className="profile-header-buttons-edit">
                    <BsPencilFill className="profile-header-buttons-icon"/>
                    <div>
                        Edit Profile
                    </div>
                </div>
            }

            {isFriends() &&
                <div className="profile-header-buttons-block">
                    <BiBlock className="profile-header-buttons-icon"/>
                    <div>
                        Block
                    </div>
                </div>
            }
        </div>
    );
}

import {Await, Link, useLoaderData, useParams} from "react-router-dom";
import React, {createRef, Suspense, useEffect, useState} from "react";
import {RelationshipStatus, User, UserInput} from "../../lib/gql/graphql.ts";
import {getUserById, updateCurrentUser} from "../../lib/controllers/user-controller.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/profile.scss";
import {BiBlock, BiMaleFemale, BiSolidUserCircle, BiSolidUserPlus} from "react-icons/bi";
import {FullPageLoading} from "../../components/loading/LoadingComponents.tsx";
import {AiFillCalendar, AiFillMessage, AiFillStar} from "react-icons/ai";
import {BsCameraVideoFill, BsEmojiSmileFill, BsPencilFill} from "react-icons/bs";
import {
    acceptFriendRequest,
    changeFriendshipStatus,
    getFriendRequests,
    rejectFriendRequest,
    sendFriendRequest
} from "../../lib/controllers/relationship-controller.ts";
import {toast} from "react-toastify";
import {HiPhoto, HiXMark} from "react-icons/hi2";
import {uploadFilesWithToast} from "../../lib/controllers/firebase-upload-controller.ts";
import ProfilePosts from "../../components/profile/ProfilePosts.tsx";
import {FriendRecommendationComponent} from "../../components/friends/FriendComponent.tsx";
import {createConversation} from "../../lib/controllers/messanger-controller.ts";
import {CreatePostComponent} from "../../components/home/CreatePost.tsx";

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

    const fileInputRef: React.Ref<HTMLInputElement> = createRef();
    const [createPost, setCreatePost] = useState(false);

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


    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const imageUrl = await uploadFilesWithToast([file]);

            const userInput: UserInput = {
                email: currentUser.email,
                username: currentUser.username,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                dateOfBirth: currentUser.dateOfBirth,
                gender: currentUser.gender,
                profilePicture: imageUrl[0],
            }

            updateCurrentUser(userInput).then((result) => {
                if (!result.success) {
                    toast.error('Failed to update profile picture', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                    });

                    return;
                }

                toast.success('Profile picture updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                window.location.reload();
            })
        }
    };

    const onProfilePictureClick = (user: User) => {
        if (currentUser.id !== user.id) {
            console.log("Not your profile picture")
            return;
        }

        if (!fileInputRef.current) {
            return;
        }

        fileInputRef.current.click();
    };

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
                                {createPost ? <CreatePostComponent user={currentUser}
                                                                   onClose={() => setCreatePost(false)}/> : null}


                                <div className="profile">
                                    <div className="profile-header">
                                        <div className="profile-header-container">
                                            <input
                                                type="file"
                                                className="profile-header-input-hidden"
                                                onChange={onFileChange}
                                                accept={"image/*"}
                                                ref={fileInputRef}
                                            />
                                            {user.profilePicture ?
                                                <img
                                                    src={user.profilePicture!}
                                                    className="profile-header-picture"
                                                    alt="Profile picture"
                                                    onClick={() => {
                                                        onProfilePictureClick(user)
                                                    }}
                                                />
                                                :
                                                <BiSolidUserCircle className="profile-header-null-picture"
                                                                   onClick={() => {
                                                                       onProfilePictureClick(user)
                                                                   }}/>
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

                                    <div className="profile-buttons">
                                        <div className="profile-buttons-icon-active">
                                            Posts
                                        </div>
                                        <div className="profile-buttons-icon">
                                            About
                                        </div>
                                        <div className="profile-buttons-icon">
                                            Friends
                                        </div>
                                    </div>

                                    <div className="profile-recommendations">
                                        <FriendRecommendationComponent currentUser={currentUser}/>
                                    </div>

                                    <div className="profile-content">
                                        <div className="profile-content-left">
                                            <div className="profile-content-left-title">
                                                Intro
                                            </div>

                                            <div className="profile-content-left-info">
                                                <div className="profile-content-left-info-gender">
                                                    <BiMaleFemale className="profile-content-left-info-icon"/>
                                                    <div>
                                                        Gender: {user.gender}
                                                    </div>
                                                </div>
                                                <div className="profile-content-left-info-gender">
                                                    <AiFillCalendar className="profile-content-left-info-icon"/>
                                                    <div>
                                                        Date of Birth: {user.dateOfBirth}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-content-right">
                                            <div className="profile-content-left-title">
                                                Posts
                                            </div>

                                            <div className="profile-content-left-posts">
                                                <div className="create-post">
                                                    <div className="create-post-header">
                                                        <Link to={'/profile/' + currentUser.id} className="user-info">
                                                            {currentUser.profilePicture ? < img className="avatar"
                                                                                                src={currentUser.profilePicture!}/> :
                                                                <BiSolidUserCircle className="avatar"/>}
                                                        </Link>
                                                        <input type="text"
                                                               placeholder={`What's on your mind, ${currentUser.firstName}?`}
                                                               onClick={e => {
                                                                   e.preventDefault();
                                                                   setCreatePost(true);
                                                               }}/>
                                                    </div>

                                                    <br/>

                                                    <div className="create-post-footer">
                                                        <div className="footer-item" onClick={e => {
                                                            e.preventDefault();
                                                            setCreatePost(true);
                                                        }}>
                                                            <BsCameraVideoFill className="camera-icon"/>
                                                            <p>Live Video</p>
                                                        </div>
                                                        <div className="footer-item" onClick={e => {
                                                            e.preventDefault();
                                                            setCreatePost(true);
                                                        }}>
                                                            <HiPhoto className="photo-icon"/>
                                                            <p>Photo/Video</p>
                                                        </div>
                                                        <div className="footer-item" onClick={e => {
                                                            e.preventDefault();
                                                            setCreatePost(true);
                                                        }}>
                                                            <BsEmojiSmileFill className="smile-icon"/>
                                                            <p>Feeling/Activity</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <ProfilePosts user={user}/>
                                            </div>
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

        return friends.map(friend => {
            return friend.id;
        }).includes(currentUser.id);
    }

    function isFavorite(): boolean {
        if (!currentUser.relations) {
            return false;
        }

        if (isSelf()) {
            return true;
        }

        return currentUser.relations
            .filter(relation => {
                return relation.status === RelationshipStatus.Favorite;
            }).map(relation => {
                return relation.user!.id;
            }).includes(user.id);
    }

    function isBlocked(): boolean {
        if (!currentUser.relations) {
            return false;
        }

        if (isSelf()) {
            return true;
        }

        return currentUser.relations
            .filter(relation => {
                return relation.status === RelationshipStatus.Blocked;
            }).map(relation => {
                return relation.user!.id;
            }).includes(user.id);
    }

    async function isPending(): Promise<boolean> {
        const result = await getFriendRequests();
        if (!result.success) {
            return false;
        }

        return result.data!.some((it) => {
            return it.from === user.id;
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

    async function onCreateConversation() {
        // random conversation name
        const name = "Conversation " + Math.floor(Math.random() * 1000);

        // compile list of user ids + current user
        const userIds: string[] = [];
        userIds.push(currentUser.id);
        userIds.push(user.id);

        const result = await createConversation(name, userIds);
        if (!result.success) {
            toast.error("Failed to create conversation", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        // add conversation to list
        toast.success("Conversation created", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
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
                        Accept Request
                    </div>
                </div>
            }

            {(!isFriends() && !isSelf() && pending) &&
                <div className="profile-header-buttons-block" onClick={onRejectFriendRequest}>
                    <HiXMark className="profile-header-buttons-icon"/>
                    <div>
                        Reject Request
                    </div>
                </div>
            }

            {(isFriends() && !isFavorite()) &&
                <div className="profile-header-buttons-cf" onClick={onAddToFavorite}>
                    <AiFillStar className="profile-header-buttons-icon"/>
                    <div>
                        Favorites
                    </div>
                </div>
            }

            {(isFriends() && isFavorite()) &&
                <div className="profile-header-buttons-cf" onClick={onSetToJustFriends}>
                    <AiFillStar className="profile-header-buttons-icon"/>
                    <div>
                        Unfavorite
                    </div>
                </div>
            }

            {isFriends() &&
                <div className="profile-header-buttons-message" onClick={onCreateConversation}>
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
                        Edit
                    </div>
                </div>
            }

            {(isFriends() && !isBlocked()) &&
                <div className="profile-header-buttons-block" onClick={onBlock}>
                    <BiBlock className="profile-header-buttons-icon"/>
                    <div>
                        Block
                    </div>
                </div>
            }

            {(isFriends() && isBlocked() && !isSelf()) &&
                <div className="profile-header-buttons-block" onClick={onSetToJustFriends}>
                    <BiBlock className="profile-header-buttons-icon"/>
                    <div>
                        Unblock
                    </div>
                </div>
            }
        </div>
    );
}

import {Audience, Conversation, Post, User} from "../../lib/gql/graphql.ts";
import {MdPublic} from "react-icons/md";
import {BsChatDotsFill, BsPeopleFill, BsTrashFill} from "react-icons/bs";
import {AiFillCloseCircle, AiFillLike, AiFillStar, AiOutlineLike} from "react-icons/ai";
import {FaUsers} from "react-icons/fa";
import {deletePost, likePost, sharePost, unlikePost} from "../../lib/controllers/post-controller.ts";
import {toast} from "react-toastify";
import {BiSolidCircle, BiSolidCommentDetail, BiSolidUserCircle} from "react-icons/bi";
import {PostLoadingComponent} from "../loading/LoadingComponents.tsx";
import {PiShareFatFill} from "react-icons/pi";
import {useEffect, useState} from "react";
import "../../styles/post.scss";
import {useNavigate} from "react-router-dom";
import {getUserConversations} from "../../lib/controllers/messanger-controller.ts";
import {IoPeopleCircleOutline} from "react-icons/io5";
import {HiCheck} from "react-icons/hi2";

export function PostComponent({post, user, onRemovePost}: {
    post: Post,
    user: User,
    onRemovePost: (postId: string) => void
}) {
    const navigate = useNavigate();
    const profilePicture = post.author.profilePicture;
    const [likedBy, setLikedBy] = useState(post.likedBy);
    const [showSharePopup, setShowSharePopup] = useState(false);

    let audienceLogo;
    if (post.audience === Audience.Public) {
        audienceLogo = <MdPublic className="post-header-info-sub-info-privacy"/>;
    } else if (post.audience === Audience.Friends) {
        audienceLogo = <BsPeopleFill className="post-header-info-sub-info-privacy"/>;
    } else if (post.audience === Audience.Favorites) {
        audienceLogo = <AiFillStar className="post-header-info-sub-info-privacy"/>;
    } else if (post.audience === Audience.Group) {
        audienceLogo = <IoPeopleCircleOutline className="post-header-info-sub-info-privacy"/>;
    } else {
        audienceLogo = <FaUsers className="post-header-info-sub-info-privacy"/>;
    }

    let hasMoreThanOneMedia = false;
    if ((post.imageContent && post.imageContent.length > 1) || (post.videoContent && post.videoContent.length > 1) || (post.imageContent && post.videoContent)) {
        hasMoreThanOneMedia = true;
    }

    const onDeletePost = () => {
        deletePost(post.id).then((res) => {
            if (!res.success) {
                toast.error("Failed to delete post", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            toast.success("Post deleted successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            onRemovePost(post.id);
        })
    }

    function countComments() {
        let count = 0;
        if (post!.comments) {
            for (const comment of post!.comments) {
                count += 1;
                if (comment.replies) {
                    count += comment.replies.length;
                }
            }
        }

        return count;
    }

    function isLikedByUser() {
        if (!likedBy) {
            return false;
        }

        return likedBy.some((value) => value.id === user.id);
    }

    function onLikePost() {
        likePost(post.id).then((res) => {
            if (!res || !res.success) {
                toast.error("Failed to like post", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            toast.success("Post liked successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });

            setLikedBy(res.data!.likedBy);
        });
    }

    function onUnlikePost() {
        unlikePost(post.id).then((res) => {
            if (!res || !res.success) {
                toast.error("Failed to unlike post", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            toast.success("Post unliked successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });

            setLikedBy(res.data!.likedBy);
        });
    }

    function redirectFull() {
        navigate("/post/" + post.id)
    }

    return (
        <div>
            {showSharePopup ? <SharePostCard post={post} onClose={() => setShowSharePopup(false)}/> : <></>}
            <div className="post">
                <div className="post-header" onClick={redirectFull}>
                    <div className="post-header-left">
                        {profilePicture ? <img className="post-header-profile-picture" src={profilePicture}/> :
                            <BiSolidUserCircle className="post-header-profile-picture-null"/>}

                        <div className="post-header-info">
                            <p className="post-header-info-user-name">
                                {post.author.firstName} {post.author.lastName}
                            </p>

                            <div className="post-header-info-sub-info">
                                <p className="post-header-info-sub-info-date">
                                    {post.createdAt}
                                </p>
                                {audienceLogo}
                            </div>
                        </div>
                    </div>

                    <div className="post-header-right">
                        {
                            user.id === post.author.id && (
                                <BsTrashFill
                                    className="post-header-right-icon-delete"
                                    onClick={onDeletePost}
                                />
                            )
                        }
                    </div>
                </div>

                <div className="post-content" onClick={redirectFull}>
                    <p className="post-content-text">
                        {post.textContent}
                    </p>

                    <div className={hasMoreThanOneMedia ? "post-content-media-overflow" : "post-content-media"}>
                        {
                            post.imageContent?.map((value) => {
                                return (
                                    <img className="post-content-media-image" src={value!}/>
                                );
                            })
                        }
                        {
                            post.videoContent?.map((value) => {
                                return (
                                    <video className="post-content-media-video" src={value!} controls/>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="post-statistics" onClick={redirectFull}>
                    <div className="post-statistics-likes">
                        {likedBy!.length} Likes
                    </div>
                    <div className="post-statistics-comments">
                        {countComments()} Comments
                    </div>
                    <div className="post-statistics-shares">
                        {post.sharedBy?.length} Shares
                    </div>
                </div>

                <div className="post-buttons">
                    {
                        isLikedByUser() ?
                            (
                                <div className="post-buttons-item post-buttons-item-like-active" onClick={onUnlikePost}>
                                    <AiFillLike className="post-buttons-item-icon"/>
                                    <div>
                                        Like
                                    </div>
                                </div>
                            ) :
                            (
                                <div className="post-buttons-item post-buttons-item-like" onClick={onLikePost}>
                                    <AiOutlineLike className="post-buttons-item-icon"/>
                                    <div>
                                        Like
                                    </div>
                                </div>
                            )
                    }

                    <div className="post-buttons-item post-buttons-item-comment" onClick={redirectFull}>
                        <BiSolidCommentDetail className="post-buttons-item-icon"/>
                        <div>
                            Comment
                        </div>
                    </div>
                    <div className="post-buttons-item post-buttons-item-share" onClick={() => setShowSharePopup(true)}>
                        <PiShareFatFill className="post-buttons-item-icon"/>
                        <div>
                            Share
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function PostSkeletonComponent() {
    return (
        <div className="post">
            <PostLoadingComponent/>
        </div>
    )
}

export function SharePostCard({post, onClose}: { post: Post, onClose: () => void }) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

    async function loadConversations() {
        const fetched = await getUserConversations();
        if (fetched.success) {
            setConversations(fetched.data!);
        } else {
            toast.error("Failed to fetch conversations", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    useEffect(() => {
        loadConversations()
    }, []);


    function selectConversation(conversation: Conversation) {
        if (selectedConversation != null && selectedConversation.id === conversation.id) {
            setSelectedConversation(null);
            return;
        }

        setSelectedConversation(conversation);
    }

    async function onSharePost() {
        const response = await sharePost(post.id, selectedConversation!.id);
        if (!response.success) {
            toast.error('Failed to share post', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Post shared', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    return (
        <div className="share-card">
            <div className="share-card-container">
                <div className="share-card-container-header">
                    <p className="share-card-container-header-title">
                        Share Post
                    </p>
                    <div onClick={onClose}>
                        <AiFillCloseCircle className="share-card-container-header-close"/>
                    </div>
                </div>
                <br/>

                <div className="share-card-container-conversations">
                    <div className="conversation-list">
                        {conversations.map((conversation) => {
                            return (
                                <ShareConversationCard
                                    conversation={conversation}
                                    onSelect={selectConversation}
                                    selected={selectedConversation != null && selectedConversation.id === conversation.id}
                                />
                            )
                        })}
                    </div>
                </div>

                <div
                    className={selectedConversation != null ? "share-card-container-button-available" : "share-card-container-button-unavailable"}
                    onClick={onSharePost}>
                    Share Post
                </div>
            </div>
        </div>
    )
}

function ShareConversationCard({conversation, selected, onSelect}: {
    conversation: Conversation,
    selected: boolean,
    onSelect: (member: Conversation) => void
}) {
    return (
        <div className="create-conversation-card-user" onClick={() => {
            onSelect(conversation);
        }}>
            {selected ? <HiCheck className="create-conversation-card-user-indicator-selected"/> :
                <BiSolidCircle className="create-conversation-card-user-indicator-unselected"/>}

            <BsChatDotsFill className="create-conversation-card-user-profile-picture-null"/>

            <div className="create-conversation-card-user-right">
                <div className="create-conversation-card-user-right-name">
                    {conversation.title}
                </div>

                {conversation.messages.length > 0 ?
                    <div className="create-conversation-card-user-right-username">
                        {conversation.messages[conversation.messages.length - 1].sender.username}: &nbsp;
                        {conversation.messages[conversation.messages.length - 1].content}
                    </div> : <></>
                }
            </div>
        </div>
    )

}

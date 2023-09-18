import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {Audience, Post, User} from "../../lib/gql/graphql.ts";
import "../../styles/post.scss";
import {BiSolidCommentDetail, BiSolidUserCircle} from "react-icons/bi";
import {BsPeopleFill, BsTrashFill} from "react-icons/bs";
import {AiFillLike, AiFillStar, AiOutlineLike} from "react-icons/ai";
import {PiShareFatFill} from "react-icons/pi";
import {MdPublic} from "react-icons/md";
import {FaUsers} from "react-icons/fa";
import {createComment, deletePost, getPostById, likePost, unlikePost} from "../../lib/controllers/post-controller.ts";
import {toast} from "react-toastify";
import React, {useEffect, useState} from "react";
import NavigationBar from "../../components/NavigationBar.tsx";
import CommentComponent from "../../components/post/CommentComponent.tsx";

export default function PostPage() {
    const currentUser = useLoaderData() as User;
    const navigate = useNavigate();
    const {id} = useParams();

    const [post, setPost] = useState<Post | null>(null);
    const [likedBy, setLikedBy] = useState<User[]>([]);

    const [commentHolder, setCommentHolder] = useState("");
    const [commentInput, setCommentInput] = useState("");

    async function loadPost() {
        if (id === null) {
            navigate("/home");
        }

        const response = await getPostById(id!);
        if (!response.success) {
            toast.error('Failed loading post', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        const post = response.data!;
        setPost(post);
        setCommentHolder(post.id!)
        setLikedBy(post.likedBy!);
    }

    useEffect(() => {
        loadPost();
    }, []);

    if (!post) {
        return (
            <div>
                <NavigationBar user={currentUser}/>
            </div>
        )
    }

    const profilePicture = post.author.profilePicture;

    let audienceLogo;
    if (post.audience === Audience.Public) {
        audienceLogo = <MdPublic className="post-header-info-sub-info-privacy"/>;
    } else if (post.audience === Audience.Friends) {
        audienceLogo = <BsPeopleFill className="post-header-info-sub-info-privacy"/>;
    } else if (post.audience === Audience.Favorites) {
        audienceLogo = <AiFillStar className="post-header-info-sub-info-privacy"/>;
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
        });
    }

    function countComments() {
        let count = 0;
        if (post!.comments) {
            post!.comments.forEach((comment) => {
                if (comment.replies) {
                    count += comment.replies.length;
                } else {
                    count++;
                }
            })
        }

        return count;
    }

    function isLikedByUser() {
        if (!likedBy) {
            return false;
        }

        return likedBy.some((value) => value.id === currentUser.id);
    }

    function onLikePost() {
        likePost(post!.id).then((res) => {
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

            setLikedBy(res.data!.likedBy!);
        });
    }

    function onUnlikePost() {
        unlikePost(post!.id).then((res) => {
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

            setLikedBy(res.data!.likedBy!);
        });
    }

    async function onCommentEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            if (commentInput === "") {
                toast.error('Comment cannot be empty!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            const response = await createComment(commentHolder, commentInput);
            if (!response.success) {
                toast.error('Failed creating comment', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            toast.success('Comment created successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            window.location.reload();
        }
    }


    return (
        <div>
            <NavigationBar user={currentUser}/>
            <div className="post-page">
                <div className="post-page-container">
                    <div className="post">
                        <div className="post-header">
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
                                    currentUser.id === post.author.id && (
                                        <BsTrashFill
                                            className="post-header-right-icon-delete"
                                            onClick={onDeletePost}
                                        />
                                    )
                                }
                            </div>
                        </div>

                        <div className="post-content">
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

                        <div className="post-statistics">
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
                                        <div className="post-buttons-item post-buttons-item-like-active"
                                             onClick={onUnlikePost}>
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

                            <div className="post-buttons-item post-buttons-item-comment">
                                <BiSolidCommentDetail className="post-buttons-item-icon"/>
                                <div>
                                    Comment
                                </div>
                            </div>
                            <div className="post-buttons-item post-buttons-item-share">
                                <PiShareFatFill className="post-buttons-item-icon"/>
                                <div>
                                    Share
                                </div>
                            </div>
                        </div>

                        {
                            post.comments!.length > 0 ?
                                post.comments?.map((it) => {
                                    return <CommentComponent comment={it}/>
                                }) : <></>
                        }

                        <input
                            className="post-comment-input"
                            type={"text"}
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder={"Aa"}
                            onKeyDown={onCommentEnter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

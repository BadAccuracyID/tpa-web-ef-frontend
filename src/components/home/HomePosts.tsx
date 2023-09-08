import {Audience, Post, User} from "../../lib/gql/graphql.ts";
import {Suspense} from "react";
import {Await} from "react-router-dom";
import {deletePost, getPosts} from "../../lib/controllers/post-controller.ts";
import "../../styles/post.scss";
import {BsPeopleFill, BsTrashFill} from "react-icons/bs";
import {MdPublic} from "react-icons/md";
import {AiFillStar} from "react-icons/ai";
import {FaUsers} from "react-icons/fa";
import {PostLoadingComponent} from "../loading/LoadingComponents.tsx";
import {BiSolidUserCircle} from "react-icons/bi";
import {toast} from "react-toastify";

export default function HomePosts({user}: { user: User }) {

    async function fetchPosts(): Promise<Post[]> {
        const fetched = await getPosts(0, 5);
        if (!fetched.success) {
            return [];
        }

        return fetched.data!;
    }

    return (
        <div>
            <Suspense fallback={<PostSkeletonComponent/>}>
                <Await resolve={fetchPosts()}>
                    {(posts: Post[]) => {
                        return (
                            <div className="post-list">
                                {posts.map((post: Post) => {
                                    return (
                                        <PostComponent post={post} user={user}/>
                                    )
                                })}
                            </div>
                        );
                    }}
                </Await>
            </Suspense>
        </div>
    )
}

function PostComponent({post, user}: { post: Post, user: User }) {
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
        })
    }

    console.log(user.id)
    console.log(post.author.id)
    console.log(user.id === post.author.id)

    return (
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
                        user.id === post.author.id && (
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
        </div>
    )
}

function PostSkeletonComponent() {
    return (
        <div className="post">
            <PostLoadingComponent/>
        </div>
    )
}

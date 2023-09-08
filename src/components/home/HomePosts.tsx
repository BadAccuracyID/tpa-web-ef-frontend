import {Audience, Post, User} from "../../lib/gql/graphql.ts";
import {useCallback, useEffect, useState} from "react";
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
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [anyMore, setAnyMore] = useState(true);

    const loadPosts = useCallback(async () => {
        if (loading || !anyMore) {
            return;
        }

        setLoading(true);
        setPage(prevPage => prevPage + 1);
        const fetched = await getPosts(page, 5);
        console.log("page: " + page)

        if (fetched.success) {
            if (fetched.data!.length === 0) {
                setAnyMore(false);
                return;
            }

            setPosts((prev) => [...prev, ...fetched.data!]);

            // remove duplicates
            setPosts((prev) => prev.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i));
        } else {
            toast.error("Failed to fetch posts", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }

        setLoading(false);
    }, [page]); // Put dependencies here

    useEffect(() => {
        loadPosts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
                // loadPosts();
            }
        }

        window.addEventListener('scroll', handleScroll);

        // Clean up event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadPosts]);

    return (
        <div>
            <div className="post-list">
                {posts.map((post) => (
                    <PostComponent key={post.id} post={post} user={user}/>
                ))}
            </div>
            {(loading && !anyMore) && <PostSkeletonComponent/>}
        </div>
    );
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

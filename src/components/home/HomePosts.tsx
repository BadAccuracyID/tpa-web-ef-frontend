import {Audience, Post} from "../../lib/gql/graphql.ts";
import {Suspense} from "react";
import {Await} from "react-router-dom";
import {getPosts} from "../../lib/controllers/post-controller.ts";
import "../../styles/post.scss";
import {BsPeopleFill} from "react-icons/bs";
import {MdPublic} from "react-icons/md";
import {AiFillStar} from "react-icons/ai";
import {FaUsers} from "react-icons/fa";
import {PostLoadingComponent} from "../loading/LoadingComponents.tsx";
import {BiSolidUserCircle} from "react-icons/bi";

export default function HomePosts() {

    async function fetchPosts(): Promise<Post[]> {
        const fetched = await getPosts(1, 5);
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
                                        <PostComponent post={post}/>
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

function PostComponent({post}: { post: Post }) {
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

    return (
        <div className="post">
            <div className="post-header">
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

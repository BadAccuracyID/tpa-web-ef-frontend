import {Audience, Post, User} from "../../lib/gql/graphql.ts";
import {Suspense} from "react";
import {Await} from "react-router-dom";
// import {getPosts} from "../../lib/controllers/post-controller.ts";
import "../../styles/post.scss";
import {BsPeopleFill} from "react-icons/bs";
import {MdPublic} from "react-icons/md";
import {AiFillStar} from "react-icons/ai";
import {FaUsers} from "react-icons/fa";

export default function HomePosts({user}: { user: User }) {

    // async function fetchPosts(): Promise<Post[]> {
    //     const fetched = await getPosts(1, 5);
    //     if (!fetched.success) {
    //         return [];
    //     }
    //
    //     return fetched.data!;
    // }

    async function mockFetchPosts(): Promise<Post[]> {
        const post: Post = {
            id: "001",
            title: "Mock Post",
            audience: Audience.Public,
            author: {
                id: user.id,
                email: user.email,
                username: user.username,
                dateOfBirth: user.dateOfBirth,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                activated: user.activated,
            },
            comments: null,
            createdAt: new Date().toDateString(),
            hashtags: null,
            likedBy: null,
            sharedBy: null,
            taggedUsers: null,
            textContent: "This is a mock post.",
            videoContent: null,
            imageContent: [
                // "https://student-activity.binus.ac.id/himmat/wp-content/uploads/sites/14/2023/03/jere-pp.jpg",
                // "https://student-activity.binus.ac.id/himmat/wp-content/uploads/sites/14/2023/03/jere-pp.jpg",
            ],
        }

        // sleep for 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [post];
    }

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={mockFetchPosts()}>
                    {(posts: Post[]) => {
                        return (
                            <div>
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
    const profilePicture = "https://student-activity.binus.ac.id/himmat/wp-content/uploads/sites/14/2023/03/jere-pp.jpg";

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
                <img className="post-header-profile-picture" src={profilePicture}/>
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

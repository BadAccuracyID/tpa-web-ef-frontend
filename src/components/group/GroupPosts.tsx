import {Group, Post, User} from "../../lib/gql/graphql.ts";
import {useState} from "react";
import {PostComponent} from "../post/PostComponent.tsx";

export default function GroupPosts({currentUser, group}: { currentUser: User, group: Group }) {
    const [posts, setPosts] = useState<Post[]>(group.posts);

    const onRemovePost = (postId: string) => {
        setPosts((prev) => prev.filter((v) => v.id !== postId));
    }

    return (
        <div>
            <div className="post-list-profile">
                {posts.map((post) => (
                    <PostComponent key={post.id} post={post} user={currentUser} onRemovePost={onRemovePost}/>
                ))}
            </div>
        </div>
    );
}

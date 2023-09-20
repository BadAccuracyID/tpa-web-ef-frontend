import {Post, User} from "../../lib/gql/graphql.ts";
import {getJoinedGroupPosts} from "../../lib/controllers/group-controller.ts";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {PostComponent} from "../post/PostComponent.tsx";
import "../../styles/group.scss";

export function HomeGroupContent({currentUser}: { currentUser: User }) {

    const [posts, setPosts] = useState<Post[]>([]);

    async function loadData() {
        const response = await getJoinedGroupPosts();
        if (!response.success) {
            if (response.errorMsg![0] !== 'Invalid response from server') {
                toast.error('Failed to load joined group posts', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
            return;
        }

        setPosts(response.data!);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="home-post-list">
            {posts.map((post) => (
                <PostComponent key={post.id} post={post} user={currentUser} onRemovePost={() => {
                }}/>
            ))}
        </div>
    )
}

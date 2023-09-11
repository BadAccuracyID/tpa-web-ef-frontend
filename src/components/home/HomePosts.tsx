import {Post, User} from "../../lib/gql/graphql.ts";
import {useCallback, useEffect, useState} from "react";
import {getPosts} from "../../lib/controllers/post-controller.ts";
import "../../styles/post.scss";
import {toast} from "react-toastify";
import {PostComponent, PostSkeletonComponent} from "../post/PostComponent.tsx";

export default function HomePosts({user}: { user: User }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [anyMore, setAnyMore] = useState(true);

    const loadPosts = useCallback(async () => {
        if (!anyMore) {
            return;
        }

        setLoading(true);

        const nextPage = page + 1;
        const fetched = await getPosts(nextPage, 5);
        setPage(nextPage);

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
                loadPosts();
            }
        }

        window.addEventListener('scroll', handleScroll);

        // Clean up event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadPosts]);

    const onRemovePost = (postId: string) => {
        setPosts((prev) => prev.filter((v) => v.id !== postId));
    }

    return (
        <div>
            <div className="post-list">
                {posts.map((post) => (
                    <PostComponent key={post.id} post={post} user={user} onRemovePost={onRemovePost}/>
                ))}
            </div>
            {(loading && !anyMore) && <PostSkeletonComponent/>}
        </div>
    );
}

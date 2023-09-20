import {Post, User} from "../../lib/gql/graphql.ts";
import {getJoinedGroupPosts} from "../../lib/controllers/group-controller.ts";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export function HomeGroupContent({currentUser}: { currentUser: User }) {

    const [posts, setPosts] = useState<Post[]>([]);

    async function loadData() {
        const response = await getJoinedGroupPosts();
        if (!response.success) {
            toast.error('Failed to load joined group posts', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        setPosts(response.data!);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>

        </div>
    )
}

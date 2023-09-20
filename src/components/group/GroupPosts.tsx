import {Group, Post, User} from "../../lib/gql/graphql.ts";
import {useState} from "react";
import {PostComponent} from "../post/PostComponent.tsx";
import {Link} from "react-router-dom";
import {BiSolidUserCircle} from "react-icons/bi";
import {BsCameraVideoFill, BsEmojiSmileFill} from "react-icons/bs";
import {HiPhoto} from "react-icons/hi2";
import {CreateGroupPostComponent} from "../home/CreatePost.tsx";
import "../../styles/group.scss";

export default function GroupPosts({currentUser, group}: { currentUser: User, group: Group }) {
    const [posts, setPosts] = useState<Post[]>(group.posts);
    const [createPost, setCreatePost] = useState(false);

    const onRemovePost = (postId: string) => {
        setPosts((prev) => prev.filter((v) => v.id !== postId));
    }

    return (
        <div className="group-posts">
            {createPost ? <CreateGroupPostComponent user={currentUser}
                                                    group={group}
                                                    onClose={() => setCreatePost(false)}/> : null}

            <div className="create-post">
                <div className="create-post-header">
                    <Link to={'/profile/' + currentUser.id} className="user-info">
                        {currentUser.profilePicture ? < img className="avatar" src={currentUser.profilePicture!}/> :
                            <BiSolidUserCircle className="avatar"/>}
                    </Link>
                    <input type="text"
                           placeholder={`What's on your mind, ${currentUser.firstName}?`}
                           onClick={e => {
                               e.preventDefault();
                               setCreatePost(true);
                           }}/>
                </div>

                <br/>

                <div className="create-post-footer">
                    <div className="footer-item" onClick={e => {
                        e.preventDefault();
                        setCreatePost(true);
                    }}>
                        <BsCameraVideoFill className="camera-icon"/>
                        <p>Live Video</p>
                    </div>
                    <div className="footer-item" onClick={e => {
                        e.preventDefault();
                        setCreatePost(true);
                    }}>
                        <HiPhoto className="photo-icon"/>
                        <p>Photo/Video</p>
                    </div>
                    <div className="footer-item" onClick={e => {
                        e.preventDefault();
                        setCreatePost(true);
                    }}>
                        <BsEmojiSmileFill className="smile-icon"/>
                        <p>Feeling/Activity</p>
                    </div>
                </div>
            </div>

            <div className="post-list-profile">
                {posts.map((post) => (
                    <PostComponent key={post.id} post={post} user={currentUser} onRemovePost={onRemovePost}/>
                ))}
            </div>
        </div>
    );
}

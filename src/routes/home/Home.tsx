import {Link, useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/home.scss";
import {BiDetail, BiSolidUserCircle} from "react-icons/bi";
import {FaClock, FaUserFriends, FaUsers} from "react-icons/fa";
import {AiFillShop} from "react-icons/ai";
import {PiVideoFill} from "react-icons/pi";
import {BsCameraVideoFill, BsEmojiSmileFill, BsFillBookmarkFill} from "react-icons/bs";
import {HiPhoto} from "react-icons/hi2";
import HomePosts from "../../components/home/HomePosts.tsx";
import {CreatePostComponent} from "../../components/home/CreatePost.tsx";
import {useState} from "react";

export default function HomePage() {
    const user = useLoaderData() as User;
    if (user === null) {
        return (
            <div>
            </div>
        );
    }

    const profilePicture = user.profilePicture;
    const [createPost, setCreatePost] = useState(false);

    function openCreatePost() {
        setCreatePost(true);
    }

    function closeCreatePost() {
        setCreatePost(false);
    }

    return (
        <div>
            <NavigationBar user={user}/>
            {createPost ? <CreatePostComponent user={user} onClose={closeCreatePost}/> : null}

            <div className="home">
                <div className="left">
                    <div className="subLeft">
                        <Link to={'/profile/' + user.id} className="user-info">
                            {profilePicture ?
                                <img
                                    className="avatar"
                                    src={profilePicture}
                                    alt="profile picture"
                                /> :
                                <BiSolidUserCircle className="avatar"/>}
                            <p className="name">{user.firstName} {user.lastName}</p>
                        </Link>

                        <Link to="/friends" className="other-navigation">
                            <FaUserFriends className="other-navigation-icon"/>
                            <p className="other-navigation-text">Find Friends</p>
                        </Link>

                        <Link to="/" className="other-navigation">
                            <BiDetail className="other-navigation-icon"/>
                            <p className="other-navigation-text">Feeds</p>
                        </Link>

                        <Link to="/groups" className="other-navigation">
                            <FaUsers className="other-navigation-icon"/>
                            <p className="other-navigation-text">Group</p>
                        </Link>

                        <Link to="/" className="other-navigation">
                            <AiFillShop className="other-navigation-icon"/>
                            <p className="other-navigation-text">Marketplace</p>
                        </Link>

                        <Link to="/" className="other-navigation">
                            <PiVideoFill className="other-navigation-icon"/>
                            <p className="other-navigation-text">Video</p>
                        </Link>

                        <Link to="/" className="other-navigation">
                            <FaClock className="other-navigation-icon"/>
                            <p className="other-navigation-text">Memories</p>
                        </Link>

                        <Link to="/" className="other-navigation">
                            <BsFillBookmarkFill className="other-navigation-icon"/>
                            <p className="other-navigation-text">Saved</p>
                        </Link>
                    </div>
                </div>

                <div className="middle">
                    <div className="create-post">
                        <div className="create-post-header">
                            <Link to={'/profile/' + user.id} className="user-info">
                                {profilePicture ? < img className="avatar" src={profilePicture}/> :
                                    <BiSolidUserCircle className="avatar"/>}
                            </Link>
                            <input type="text"
                                   placeholder={`What's on your mind, ${user.firstName}?`}
                                   onClick={e => {
                                       e.preventDefault();
                                       openCreatePost()
                                   }}/>
                        </div>

                        <br/>

                        <div className="create-post-footer">
                            <div className="footer-item" onClick={e => {
                                e.preventDefault();
                                openCreatePost()
                            }}>
                                <BsCameraVideoFill className="camera-icon"/>
                                <p>Live Video</p>
                            </div>
                            <div className="footer-item" onClick={e => {
                                e.preventDefault();
                                openCreatePost()
                            }}>
                                <HiPhoto className="photo-icon"/>
                                <p>Photo/Video</p>
                            </div>
                            <div className="footer-item" onClick={e => {
                                e.preventDefault();
                                openCreatePost()
                            }}>
                                <BsEmojiSmileFill className="smile-icon"/>
                                <p>Feeling/Activity</p>
                            </div>
                        </div>
                    </div>

                    <HomePosts user={user}/>
                </div>
            </div>

        </div>
    )
}

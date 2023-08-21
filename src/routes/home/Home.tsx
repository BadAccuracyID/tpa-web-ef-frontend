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

export default function HomePage() {
    const user = useLoaderData() as User;
    const profilePicture = user.profilePicture;

    return (
        <div>
            <NavigationBar user={user}/>
            <div className="home">
                <div className="left">
                    <div className="subLeft">
                        <Link to="/" className="user-info">
                            {profilePicture ? <img className="avatar" src={profilePicture}/> :
                                <BiSolidUserCircle className="avatar"/>}
                            <p className="name">{user.firstName} {user.lastName}</p>
                        </Link>

                        <Link to="/" className="other-navigation">
                            <FaUserFriends className="other-navigation-icon"/>
                            <p className="other-navigation-text">Find Friends</p>
                        </Link>

                        <Link to="/" className="other-navigation">
                            <BiDetail className="other-navigation-icon"/>
                            <p className="other-navigation-text">Feeds</p>
                        </Link>

                        <Link to="/" className="other-navigation">
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
                            <Link to="/" className="user-info">
                                {profilePicture ? < img className="avatar" src={profilePicture}/> :
                                    <BiSolidUserCircle className="avatar"/>}
                            </Link>
                            <input type="text" placeholder={`What's on your mind, ${user.firstName}?`}/>
                        </div>

                        <br/>

                        <div className="create-post-footer">
                            <Link to="/" className="footer-item">
                                <BsCameraVideoFill className="camera-icon"/>
                                <p>Live Video</p>
                            </Link>
                            <Link to="/" className="footer-item">
                                <HiPhoto className="photo-icon"/>
                                <p>Photo/Video</p>
                            </Link>
                            <Link to="/" className="footer-item">
                                <BsEmojiSmileFill className="smile-icon"/>
                                <p>Feeling/Activity</p>
                            </Link>
                        </div>
                    </div>

                    <HomePosts user={user}/>
                </div>

            </div>

        </div>
    )
}

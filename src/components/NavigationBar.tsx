import {User} from "../lib/gql/graphql.ts";
import "../styles/navbar.scss";
import {AiFillHome} from "react-icons/ai";
import {BsChatDotsFill, BsPeople} from "react-icons/bs";
import {IoPeopleCircleOutline} from "react-icons/io5";
import {IoMdNotifications} from "react-icons/io";
import {BiSolidUserCircle} from "react-icons/bi";
import {Link, useNavigate} from "react-router-dom";

export default function NavigationBar({user}: { user: User }) {
    const navigate = useNavigate();
    const profilePicture = user.profilePicture;

    function onLogout() {
        // temporary
        localStorage.removeItem("token");
        navigate("/auth/login");
    }

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/home">
                    <img className="logo"
                         src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                         alt="Logo"
                    />
                </Link>

                <input className="searchBar" placeholder="Search faRebook"/>
            </div>

            <div className="middle">
                <Link to="/home">
                    <AiFillHome className="icon-active"/>
                </Link>

                <Link to="/home">
                    <BsPeople className="icon"/>
                </Link>

                <Link to="/home">
                    <IoPeopleCircleOutline className="icon"/>
                </Link>
            </div>

            <div className="right">
                <Link to="/messenger">
                    <BsChatDotsFill className="icon"/>
                </Link>

                <Link to="/home">
                    <IoMdNotifications className="icon"/>
                </Link>

                <div onClick={onLogout}>
                    {profilePicture ? <img className="profile" src={profilePicture}/> :
                        <BiSolidUserCircle className="profile-null"/>}
                </div>
            </div>
        </div>
    )
}

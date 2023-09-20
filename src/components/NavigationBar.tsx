import {User} from "../lib/gql/graphql.ts";
import "../styles/navbar.scss";
import {AiFillHome} from "react-icons/ai";
import {BsChatDotsFill, BsPeople} from "react-icons/bs";
import {IoPeopleCircleOutline} from "react-icons/io5";
import {IoMdNotifications} from "react-icons/io";
import {BiSolidUserCircle} from "react-icons/bi";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ImExit} from "react-icons/im";
import {getNotifications} from "../lib/controllers/notification-controller.ts";

export default function NavigationBar({user}: { user: User }) {
    const navigate = useNavigate();
    const [notificationCount, setNotificationCount] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const profilePicture = user.profilePicture;

    async function loadNotificationCount() {
        const response = await getNotifications();
        if (!response.success) {
            return;
        }

        const notifications = response.data!.filter(notification => !notification.read);
        setNotificationCount(notifications.length);
    }

    useEffect(() => {
        loadNotificationCount();
    }, []);

    function onLogout() {
        // temporary
        localStorage.removeItem("token");
        navigate("/auth/login");
    }

    function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchParams({q: e.target.value});
    }

    function onSearchEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            console.log(searchParams.get("q"));
            navigate("/search?q=" + searchParams.get("q") || "");
        }
    }

    function isOnHome() {
        return window.location.pathname.startsWith("/home");
    }

    function isOnFriends() {
        return window.location.pathname.startsWith("/friends");
    }

    function isOnGroup() {
        return window.location.pathname.startsWith("/group");
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

                <input className="searchBar"
                       placeholder="Search faRebook"
                       value={searchParams.get("q") || ""}
                       onChange={onSearchChange}
                       onKeyDown={onSearchEnter}
                />
            </div>

            <div className="middle">
                <Link to="/home">
                    <AiFillHome className={isOnHome() ? "icon-active" : "icon"}/>
                </Link>

                <Link to="/friends">
                    <BsPeople className={isOnFriends() ? "icon-active" : "icon"}/>
                </Link>

                <Link to="/groups">
                    <IoPeopleCircleOutline className={isOnGroup() ? "icon-active" : "icon"}/>
                </Link>
            </div>

            <div className="right">
                <Link to="/messenger">
                    <BsChatDotsFill className="icon"/>
                </Link>

                <div onClick={onLogout}>
                    <ImExit className="icon"/>
                </div>

                <Link to={'/profile/' + user.id}>
                    {profilePicture ? <img className="navbar-avatar" src={profilePicture}/> :
                        <BiSolidUserCircle className="profile-null"/>}
                </Link>

                <Link to="/notifications">
                    <IoMdNotifications className="icon"/>
                    <div className="notification-count">
                        {notificationCount}
                    </div>
                </Link>
            </div>
        </div>
    )
}

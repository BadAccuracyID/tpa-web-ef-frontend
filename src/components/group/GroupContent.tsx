import {Group, User} from "../../lib/gql/graphql.ts";
import {useState} from "react";
import GroupPosts from "./GroupPosts.tsx";
import {BiMaleFemale} from "react-icons/bi";
import {AiFillCalendar} from "react-icons/ai";
import {Link} from "react-router-dom";
import {BsChatDotsFill} from "react-icons/bs";

enum GroupContentMenu {
    POSTS,
    FILES,
    MEMBERS,
}

export function GroupContent({currentUser, group}: { currentUser: User, group: Group }) {

    const [menu, setMenu] = useState<GroupContentMenu>(GroupContentMenu.POSTS);

    return (
        <div className="group">
            <div className="group-header">
                <div className="group-header-container">
                    <img
                        className="group-header-picture"
                        src={group.picture}
                        alt="group-image"
                    />

                    <div className="group-header-info">
                        <div className="group-header-info-name">
                            {group.name}
                        </div>
                        <div className="group-header-info-description">
                            {group.description}
                        </div>

                        <div className="group-header-info-stats">
                            <div className="group-header-info-stats-stat">
                                <div className="group-header-info-stats-stat-text">
                                    {group.members.length} members
                                </div>
                            </div>
                            <div className="group-header-info-stats-stat">
                                <div className="group-header-info-stats-stat-text">
                                    {group.admins.length} admins
                                </div>
                            </div>
                            <div className="group-header-info-stats-stat">
                                <div className="group-header-info-stats-stat-text">
                                    {group.posts.length} posts
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="group-buttons">
                <div
                    className={'group-buttons-icon' + (menu === GroupContentMenu.POSTS ? '-active' : '')}
                    onClick={() => setMenu(GroupContentMenu.POSTS)}
                >
                    Posts
                </div>
                <div
                    className={'group-buttons-icon' + (menu === GroupContentMenu.FILES ? '-active' : '')}
                    onClick={() => setMenu(GroupContentMenu.FILES)}
                >
                    Files
                </div>
                <div
                    className={'group-buttons-icon' + (menu === GroupContentMenu.MEMBERS ? '-active' : '')}
                    onClick={() => setMenu(GroupContentMenu.MEMBERS)}
                >
                    Members
                </div>
            </div>

            <div className="group-content">
                <GroupContentItems currentUser={currentUser} group={group} menu={menu}/>
            </div>
        </div>
    )
}

function GroupContentItems({currentUser, group, menu}: { currentUser: User, group: Group, menu: GroupContentMenu }) {
    switch (menu) {
        case GroupContentMenu.POSTS:
            return <GroupContentPosts currentUser={currentUser} group={group}/>
        case GroupContentMenu.FILES:
            break;
        case GroupContentMenu.MEMBERS:
            break;
    }

    return <></>
}

function GroupContentPosts({currentUser, group}: { currentUser: User, group: Group }) {
    return (
        <div className="group-content-posts">
            <div className="group-content-posts-left">
                <div className="group-content-posts-left-title">
                    Posts
                </div>

                <GroupPosts currentUser={currentUser} group={group}/>
            </div>

            <div className="group-content-posts-right">
                <div className="group-content-posts-right-title">
                    Intro
                </div>

                <div className="group-content-posts-right-info">
                    <div className="group-content-posts-right-info-gender">
                        <BiMaleFemale className="group-content-posts-right-info-icon"/>
                        <div>
                            Members: {group.members.length}
                        </div>
                    </div>
                    <div className="group-content-posts-right-info-gender">
                        <AiFillCalendar className="group-content-posts-right-info-icon"/>
                        <div>
                            Admins: {group.admins.length}
                        </div>
                    </div>
                </div>

                <div className="group-content-posts-right-title">
                    Group Chat
                </div>

                <Link to="/messenger" className="group-content-posts-right-info">
                    <div className="group-content-posts-right-info-chat">
                        <BsChatDotsFill className="group-content-posts-right-info-icon-chat"/>
                        <div>
                            Open Group Chat: {group.name}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

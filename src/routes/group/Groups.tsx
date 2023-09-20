import {Link, useLoaderData} from "react-router-dom";
import {Group, User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/group.scss";
import {useEffect, useState} from "react";
import {CreateGroupCard} from "../../components/group/GroupComponent.tsx";
import {getUserGroups} from "../../lib/controllers/group-controller.ts";
import {toast} from "react-toastify";
import {AiFillCalendar, AiFillCompass} from "react-icons/ai";
import {BiMaleFemale, BiSolidGroup} from "react-icons/bi";
import {FaNewspaper} from "react-icons/fa6";
import GroupPosts from "../../components/group/GroupPosts.tsx";
import {BsChatDotsFill} from "react-icons/bs";

enum MenuPage {
    HOME,
    DISCOVER,
    YOUR_GROUP,
    GROUP
}

// show all joined groups
export default function GroupsPage() {
    const currentUser = useLoaderData() as User;

    const [page, setPage] = useState<MenuPage>(MenuPage.HOME);
    const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const loadData = async () => {
        const response = await getUserGroups();
        if (!response.success) {
            toast.error('Failed to load groups', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            return;
        }

        setJoinedGroups(response.data!);
    }

    useEffect(() => {
        loadData();
    }, []);

    function changePage(page: MenuPage) {
        setPage(page);
    }

    return (
        <div>
            <NavigationBar user={currentUser}/>
            {modalOpen && <CreateGroupCard user={currentUser} onClose={() => setModalOpen(false)}/>}

            <div className="groups">
                <div className="groups-left">
                    <div className="groups-left-header">
                        <div className="groups-left-header-text">
                            Groups
                        </div>
                        <br/>
                    </div>

                    <div
                        className="groups-left-header-create-button"
                        onClick={() => setModalOpen(true)}
                    >
                        Create Group
                    </div>

                    <div className="groups-left-buttons">
                        <div className="groups-left-buttons-container"
                             onClick={() => changePage(MenuPage.HOME)}>
                            <FaNewspaper
                                className={"groups-left-buttons-icon" + (page === MenuPage.HOME ? "-active" : "")}/>
                            <div>Home</div>
                        </div>
                        <div className="groups-left-buttons-container"
                             onClick={() => changePage(MenuPage.DISCOVER)}>
                            <AiFillCompass
                                className={"groups-left-buttons-icon" + (page === MenuPage.DISCOVER ? "-active" : "")}/>
                            <div>Discover</div>
                        </div>
                        <div className="groups-left-buttons-container"
                             onClick={() => changePage(MenuPage.YOUR_GROUP)}>
                            <BiSolidGroup
                                className={"groups-left-buttons-icon" + (page === MenuPage.YOUR_GROUP ? "-active" : "")}/>
                            <div>Your Group</div>
                        </div>
                    </div>

                    <div className="groups-left-joined">
                        <div className="groups-left-joined-title">
                            Joined Groups
                        </div>
                        {
                            joinedGroups.map((group, index) => {
                                return (
                                    <div
                                        className={'groups-left-joined-container' + (selectedGroup?.id === group.id ? '-active' : '')}
                                        key={index}
                                        onClick={() => {
                                            setSelectedGroup(group)
                                            changePage(MenuPage.GROUP)
                                        }}
                                    >
                                        <img
                                            className="groups-left-joined-container-image"
                                            src={group.picture}
                                            alt="group-image"
                                        />

                                        <div className="groups-left-joined-container-texts">
                                            <div className="groups-left-joined-container-texts-name">
                                                {group.name}
                                            </div>
                                            <div className="groups-left-joined-container-texts-info">
                                                {group.members.length} members
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="groups-content">
                    <PageContent currentUser={currentUser} page={page} selectedGroup={selectedGroup}/>
                </div>
            </div>

        </div>
    )
}

function PageContent({currentUser, page, selectedGroup}: {
    currentUser: User,
    page: MenuPage,
    selectedGroup: Group | null
}) {
    switch (page) {
        case MenuPage.HOME:
            break;
        case MenuPage.DISCOVER:
            break;
        case MenuPage.YOUR_GROUP:
            break;
        case MenuPage.GROUP:
            return <GroupContent currentUser={currentUser} group={selectedGroup!}/>
    }

    return <></>
}

enum GroupMenu {
    POSTS,
    FILES,
    MEMBERS,
}

function GroupContent({currentUser, group}: { currentUser: User, group: Group }) {

    const [menu, setMenu] = useState<GroupMenu>(GroupMenu.POSTS);

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
                    className={'group-buttons-icon' + (menu === GroupMenu.POSTS ? '-active' : '')}
                    onClick={() => setMenu(GroupMenu.POSTS)}
                >
                    Posts
                </div>
                <div
                    className={'group-buttons-icon' + (menu === GroupMenu.FILES ? '-active' : '')}
                    onClick={() => setMenu(GroupMenu.FILES)}
                >
                    Files
                </div>
                <div
                    className={'group-buttons-icon' + (menu === GroupMenu.MEMBERS ? '-active' : '')}
                    onClick={() => setMenu(GroupMenu.MEMBERS)}
                >
                    Members
                </div>
            </div>

            <div className="group-content">
                <GroupItem currentUser={currentUser} group={group} menu={menu}/>
            </div>
        </div>
    )
}

function GroupItem({currentUser, group, menu}: { currentUser: User, group: Group, menu: GroupMenu }) {
    switch (menu) {
        case GroupMenu.POSTS:
            return <Posts currentUser={currentUser} group={group}/>
        case GroupMenu.FILES:
            break;
        case GroupMenu.MEMBERS:
            break;
    }

    return <></>
}

function Posts({currentUser, group}: { currentUser: User, group: Group }) {
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

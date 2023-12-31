import {Group, GroupVisibility, User} from "../../lib/gql/graphql.ts";
import React, {createRef, useState} from "react";
import GroupPosts from "./GroupPosts.tsx";
import {BiMaleFemale, BiUserCheck} from "react-icons/bi";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {Link} from "react-router-dom";
import {BsChatDotsFill} from "react-icons/bs";
import {uploadFilesWithToast} from "../../lib/controllers/firebase-upload-controller.ts";
import {
    acceptGroupInvitation,
    deleteGroup,
    quitGroup,
    requestToJoinGroup,
    setGroupPicture
} from "../../lib/controllers/group-controller.ts";
import {toast} from "react-toastify";
import {AcceptRequestCard, InviteFriendCard, KickMemberCard, PromoteMemberCard} from "./GroupContentActions.tsx";

enum GroupContentMenu {
    POSTS,
    FILES,
    MEMBERS,
}

export function GroupContent({currentUser, group}: { currentUser: User, group: Group }) {

    const [menu, setMenu] = useState<GroupContentMenu>(GroupContentMenu.POSTS);
    const fileInputRef: React.Ref<HTMLInputElement> = createRef();

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const imageUrl = await uploadFilesWithToast([file]);

            setGroupPicture(group.id, imageUrl[0]).then((result) => {
                if (!result.success) {
                    toast.error('Failed to update group picture', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                    });
                    return;
                }

                toast.success('Group picture updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                window.location.reload();
            });
        }
    };

    function onProfilePictureClick() {
        if (!group.admins.some(it => it.id === currentUser.id)) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!fileInputRef!.current) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fileInputRef!.current.click();
    }

    return (
        <div className="group">
            <div className="group-header">
                <div className="group-header-container">
                    <img
                        className="group-header-picture"
                        src={group.picture}
                        alt="group-image"
                        onClick={() => {
                            onProfilePictureClick()
                        }}
                    />
                    <input
                        type="file"
                        className="profile-header-input-hidden"
                        onChange={onFileChange}
                        accept={"image/*"}
                        ref={fileInputRef}
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
                                {group.visibility === GroupVisibility.Public ?
                                    <AiFillEye className="group-content-posts-right-info-icon"/> :
                                    <AiFillEyeInvisible className="group-content-posts-right-info-icon"/>}
                                <div className="group-header-info-stats-stat-text">
                                    {group.visibility}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <GroupActionButtons currentUser={currentUser} group={group}/>
            <GroupAdminActionButtons currentUser={currentUser} group={group}/>

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
                        <BiUserCheck className="group-content-posts-right-info-icon"/>
                        <div>
                            Admins: {group.admins.length}
                        </div>
                    </div>
                    <div className="group-content-posts-right-info-gender">
                        {group.visibility === GroupVisibility.Public ?
                            <AiFillEye className="group-content-posts-right-info-icon"/> :
                            <AiFillEyeInvisible className="group-content-posts-right-info-icon"/>}
                        <div>
                            Visibility: {group.visibility}
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

function GroupActionButtons({currentUser, group}: { currentUser: User, group: Group }) {

    const [inviteFriendOpen, setInviteFriendOpen] = useState<boolean>(false);

    function isMember() {
        return group.members.some(it => it.id === currentUser.id);
    }

    function isInvited() {
        return group.invitedUsers!.some(it => it.id === currentUser.id);
    }

    function hasOnGoingRequest() {
        return group.joinRequests!.some(it => it.id === currentUser.id);
    }

    function isOnlyMember() {
        return group.members.length === 1;
    }

    async function onJoinRequest() {
        const response = await requestToJoinGroup(group.id);
        if (!response.success) {
            toast.error('Failed to request to join group', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Requested to join group', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    async function onAcceptInvite() {
        const response = await acceptGroupInvitation(group.id);
        if (!response.success) {
            toast.error('Failed to accept invite to join group', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Accepted invite to join group', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    async function onLeave() {
        // cannot leave if the only admin on group
        if (group.admins.length === 1 && group.admins.some(it => it.id === currentUser.id)) {
            toast.error('Cannot leave group if you are the only admin', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        const response = await quitGroup(group.id);
        if (!response.success) {
            toast.error('Failed to leave group', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Left group', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    async function onDisband() {
        const response = await deleteGroup(group.id);
        if (!response.success) {
            toast.error('Failed to disband group', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Disbanded group', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    return (
        <div className="group-action-buttons">
            {inviteFriendOpen ?
                <InviteFriendCard currentUser={currentUser}
                                  group={group}
                                  onClose={() => setInviteFriendOpen(false)}/>
                : <></>}

            {
                !isMember() && !isInvited() && !hasOnGoingRequest() ?
                    <div className="group-action-buttons-join" onClick={onJoinRequest}>
                        Request to Join
                    </div>
                    : <></>
            }
            {
                !isMember() && hasOnGoingRequest() ?
                    <div className="group-action-buttons-pending">
                        Requesting to Join
                    </div>
                    : <></>
            }
            {
                !isMember() && isInvited() ?
                    <div className="group-action-buttons-join" onClick={() => onAcceptInvite()}>
                        Accept Invite
                    </div>
                    : <></>
            }
            {
                isMember() ?
                    <div className="group-action-buttons-invite" onClick={() => setInviteFriendOpen(true)}>
                        Invite Friend
                    </div>
                    : <></>
            }
            {
                isMember() ?
                    <div className="group-action-buttons-leave" onClick={() => onLeave()}>
                        Leave Group
                    </div>
                    : <></>
            }
            {
                isMember() && isOnlyMember() ?
                    <div className="group-action-buttons-leave" onClick={() => onDisband()}>
                        Disband Group
                    </div>
                    : <></>
            }

        </div>
    )
}

function GroupAdminActionButtons({currentUser, group}: { currentUser: User, group: Group }) {

    const [acceptRequestOpen, setAcceptRequestOpen] = useState<boolean>(false);
    const [kickMemberOpen, setKickMemberOpen] = useState<boolean>(false);
    const [promoteMemberOpen, setPromoteMemberOpen] = useState<boolean>(false);

    function isMember() {
        return group.members.some(it => it.id === currentUser.id);
    }

    function isAdmin() {
        return group.admins.some(it => it.id === currentUser.id);
    }

    if (!isMember() || !isAdmin()) {
        return <></>
    }

    return (
        <div className="group-action-buttons">
            {kickMemberOpen ?
                <KickMemberCard currentUser={currentUser}
                                group={group}
                                onClose={() => setKickMemberOpen(false)}/>
                : <></>}
            {acceptRequestOpen ?
                <AcceptRequestCard group={group}
                                   onClose={() => setAcceptRequestOpen(false)}/>
                : <></>}
            {promoteMemberOpen ?
                <PromoteMemberCard
                    currentUser={currentUser}
                    group={group}
                    onClose={() => setPromoteMemberOpen(false)}/>
                : <></>
            }

            <div className="group-action-buttons-accept" onClick={() => setAcceptRequestOpen(true)}>
                Accept Request
            </div>
            <div className="group-action-buttons-kick" onClick={() => setKickMemberOpen(true)}>
                Kick Member
            </div>
            <div className="group-action-buttons-promote" onClick={() => setPromoteMemberOpen(true)}>
                Promote Member
            </div>
        </div>
    )
}

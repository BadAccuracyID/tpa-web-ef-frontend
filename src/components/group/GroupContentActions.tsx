import {Group, User} from "../../lib/gql/graphql.ts";
import {useState} from "react";
import {toast} from "react-toastify";
import {AiFillCloseCircle} from "react-icons/ai";
import {acceptGroupRequest, kickMemberFromGroup} from "../../lib/controllers/group-controller.ts";
import "../../styles/group.scss";
import {HiCheck} from "react-icons/hi2";
import {BiSolidCircle, BiSolidUserCircle} from "react-icons/bi";

export function KickMemberCard({currentUser, group, onClose}: {
    currentUser: User,
    group: Group,
    onClose: () => void
}) {
    const [selectedMember, setSelectedMember] = useState<User | null>(null);

    function selectMember(member: User) {
        if (isSelected(member)) {
            setSelectedMember(null);
            return;
        }

        setSelectedMember(member);
    }

    async function onKickMember() {
        if (!selectedMember) {
            return;
        }

        if (selectedMember.id === currentUser.id) {
            toast.error('You cannot kick yourself', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        const response = await kickMemberFromGroup(group.id, selectedMember.id);
        if (!response.success) {
            toast.error('Failed to remove member', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Member removed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    function isSelected(member: User) {
        return selectedMember != null && selectedMember.id === member.id;
    }

    return (
        <div className="share-card">
            <div className="share-card-container">
                <div className="share-card-container-header">
                    <p className="share-card-container-header-title">
                        Kick Member
                    </p>
                    <div onClick={onClose}>
                        <AiFillCloseCircle className="share-card-container-header-close"/>
                    </div>
                </div>
                <br/>

                <div className="share-card-container-conversations">
                    <div className="conversation-list">
                        {
                            group.members.map((member) => {
                                return (
                                    <GroupMemberCard member={member}
                                                     onSelect={selectMember}
                                                     selected={isSelected(member)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                <div
                    className={selectedMember != null ? "share-card-container-button-available" : "share-card-container-button-unavailable"}
                    onClick={onKickMember}>
                    Kick Member
                </div>
            </div>
        </div>
    )
}

export function AcceptRequestCard({group, onClose}: {
    group: Group,
    onClose: () => void
}) {
    const [selectedMember, setSelectedMember] = useState<User | null>(null);

    function selectMember(member: User) {
        if (isSelected(member)) {
            setSelectedMember(null);
            return;
        }

        setSelectedMember(member);
    }

    async function onAcceptRequest() {
        if (!selectedMember) {
            return;
        }

        const response = await acceptGroupRequest(group.id, selectedMember.id);
        if (!response.success) {
            toast.error('Failed to accept join request', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Join request accepted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    function isSelected(member: User) {
        return selectedMember != null && selectedMember.id === member.id;
    }

    return (
        <div className="share-card">
            <div className="share-card-container">
                <div className="share-card-container-header">
                    <p className="share-card-container-header-title">
                        Accept Request
                    </p>
                    <div onClick={onClose}>
                        <AiFillCloseCircle className="share-card-container-header-close"/>
                    </div>
                </div>
                <br/>

                <div className="share-card-container-conversations">
                    <div className="conversation-list">
                        {
                            group.joinRequests!.map((member) => {
                                return (
                                    <GroupMemberCard member={member}
                                                     onSelect={selectMember}
                                                     selected={isSelected(member)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                <div
                    className={selectedMember != null ? "share-card-container-button-available" : "share-card-container-button-unavailable"}
                    onClick={onAcceptRequest}>
                    Accept Request
                </div>
            </div>
        </div>
    )
}

function GroupMemberCard({member, selected, onSelect}: {
    member: User,
    selected: boolean,
    onSelect: (member: User) => void
}) {
    const profilePicture = member.profilePicture;

    return (
        <div className="create-conversation-card-user" onClick={() => {
            onSelect(member);
        }}>
            {selected ? <HiCheck className="create-conversation-card-user-indicator-selected"/> :
                <BiSolidCircle className="create-conversation-card-user-indicator-unselected"/>}

            {profilePicture ? <img className="create-conversation-card-user-profile-picture" src={profilePicture}/> :
                <BiSolidUserCircle className="create-conversation-card-user-profile-picture-null"/>}

            <div className="create-conversation-card-user-right">
                <div className="create-conversation-card-user-right-name">
                    {member.firstName} {member.lastName}
                </div>
                <div className="create-conversation-card-user-right-username">
                    {member.username}
                </div>
            </div>
        </div>
    )
}


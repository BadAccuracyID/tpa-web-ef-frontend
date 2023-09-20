import {Group, User} from "../../lib/gql/graphql.ts";
import {useState} from "react";
import {toast} from "react-toastify";
import {AiFillCloseCircle} from "react-icons/ai";
import {acceptGroupRequest, kickMemberFromGroup, promoteMemberToAdmin} from "../../lib/controllers/group-controller.ts";
import "../../styles/group.scss";
import {HiCheck} from "react-icons/hi2";
import {BiSolidCircle, BiSolidUserCircle} from "react-icons/bi";

function showToastMessage(message: string, type: 'error' | 'success') {
    toast[type](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
    });
}

async function handleSubmitAction({action, id, selectedMemberId, actionName}: {
    action: (groupId: string, memberId: string) => Promise<ControllerResponse<unknown>>,
    id: string,
    selectedMemberId: string | undefined,
    actionName: string
}) {
    if (!selectedMemberId) {
        return;
    }

    const response = await action(id, selectedMemberId);
    if (!response.success) {
        const error = `Failed to ${actionName}`;
        showToastMessage(error, 'error');
        return;
    }

    const success = `${actionName} successful`;
    showToastMessage(success, 'success');
}

export function AcceptRequestCard({group, onClose}: {
    group: Group,
    onClose: () => void
}) {
    return (
        <HandleMemberCard
            title="Accept Request"
            action={acceptGroupRequest}
            groupId={group.id}
            memberList={group.joinRequests!}
            buttonText="Accept Request"
            onClose={onClose}/>
    )
}

export function KickMemberCard({currentUser, group, onClose}: {
    currentUser: User,
    group: Group,
    onClose: () => void
}) {
    return (
        <HandleMemberCard
            title="Kick Member"
            action={kickMemberFromGroup}
            groupId={group.id}
            memberList={group.members}
            currentUser={currentUser}
            buttonText="Kick Member"
            onClose={onClose}/>
    )
}

export function PromoteMemberCard({currentUser, group, onClose}: {
    currentUser: User,
    group: Group,
    onClose: () => void
}) {
    const admins = group.admins;
    const nonAdmins = group.members.filter((member) => {
        return !admins.some((admin) => admin.id === member.id);
    });

    return (
        <HandleMemberCard
            title="Promote Member"
            action={promoteMemberToAdmin}
            groupId={group.id}
            memberList={nonAdmins}
            currentUser={currentUser}
            buttonText="Promote Member"
            onClose={onClose}/>
    )
}

function HandleMemberCard({title, action, groupId, memberList, currentUser, buttonText, onClose}: {
    title: string,
    action: (groupId: string, memberId: string) => Promise<ControllerResponse<unknown>>,
    groupId: string,
    memberList: User[],
    currentUser?: User,
    buttonText: string,
    onClose: () => void
}) {
    const [selectedMember, setSelectedMember] = useState<User | null>(null);

    const isSelected = (member: User) => selectedMember != null && selectedMember.id === member.id;

    function selectMember(member: User) {
        if (isSelected(member)) {
            setSelectedMember(null);
            return;
        }

        setSelectedMember(member);
    }

    const handleAction = () => {
        if (selectedMember && currentUser && currentUser.id === selectedMember.id) {
            showToastMessage('You cannot kick yourself', 'error');
            return;
        }

        handleSubmitAction({
            action: action,
            id: groupId,
            selectedMemberId: selectedMember?.id,
            actionName: buttonText
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className="share-card">
            <div className="share-card-container">
                <div className="share-card-container-header">
                    <p className="share-card-container-header-title">
                        {title}
                    </p>
                    <div onClick={onClose}>
                        <AiFillCloseCircle className="share-card-container-header-close"/>
                    </div>
                </div>
                <br/>

                <div className="share-card-container-conversations">
                    <div className="conversation-list">
                        {
                            memberList.map((member) => {
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
                    onClick={handleAction}>
                    {buttonText}
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


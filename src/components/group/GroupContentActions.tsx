import {Group, User} from "../../lib/gql/graphql.ts";
import {useState} from "react";
import {toast} from "react-toastify";
import {AiFillCloseCircle} from "react-icons/ai";
import {BsChatDotsFill} from "react-icons/bs";
import {kickMemberFromGroup} from "../../lib/controllers/group-controller.ts";

export function KickMemberCard({currentUser, group, onClose}: {
    currentUser: User,
    group: Group,
    onClose: () => void
}) {
    const [selectedMember, setSelectedMember] = useState<User | null>(null);

    function selectConversation(member: User) {
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
                                    <GroupMemberCard member={member} onSelect={selectConversation}/>
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

function GroupMemberCard({member, onSelect}: {
    member: User,
    onSelect: (member: User) => void
}) {
    return (
        <div className="conversation-card" onClick={() => {
            onSelect(member);
        }}>
            <BsChatDotsFill className="conversation-card-picture-null"/>

            <div className="conversation-right">
                <div className="conversation-card-right-title">
                    {member.firstName} {member.lastName}
                </div>
                <div className="conversation-card-right-last-message">
                    {member.username}
                </div>
            </div>
        </div>
    )
}

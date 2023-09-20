import {useLoaderData} from "react-router-dom";
import {Conversation, RelationshipStatus, User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/messenger.scss";
import {BiSolidCircle, BiSolidPlusCircle, BiSolidUserCircle} from "react-icons/bi";
import Conversations from "../../components/messenger/Conversation.tsx";
import ChatComponent from "../../components/messenger/Chat.tsx";
import {useCallback, useEffect, useState} from "react";
import {createConversation, getUserConversations} from "../../lib/controllers/messanger-controller.ts";
import {toast} from "react-toastify";
import {AiFillCloseCircle} from "react-icons/ai";
import {HiCheck} from "react-icons/hi2";

export default function MessengerPage() {
    const user = useLoaderData() as User;
    const [showCreateConversation, setShowCreateConversation] = useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

    const [refresh, setRefresh] = useState<boolean>(false);

    const loadConversations = useCallback(async () => {
        const fetched = await getUserConversations();
        if (fetched.success) {
            setConversations(fetched.data!);
        } else {
            toast.error("Failed to fetch conversations", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }, []);

    useEffect(() => {
        loadConversations();
    }, []);

    useEffect(() => {
        loadConversations();
    }, [refresh]);

    function selectConversation(conversation: Conversation) {
        setSelectedConversation(conversation);
    }

    function onCreateConversationClick() {
        setShowCreateConversation(true);
    }

    function addConversation(conversation: Conversation) {
        setConversations([...conversations, conversation]);
        setRefresh(old => !old);
    }

    return (
        <div>
            <NavigationBar user={user}/>
            {showCreateConversation &&
                <CreateConversationCard
                    user={user}
                    onClose={() => setShowCreateConversation(false)}
                    addConversation={addConversation}
                />}

            <div className="messenger">
                <div className="messenger-left">
                    <div className="messenger-left-header">
                        <div className="messenger-left-header-text">
                            Chats
                        </div>

                        <div className="messenger-left-header-icons" onClick={onCreateConversationClick}>
                            <BiSolidPlusCircle className="messenger-left-header-icons-new"/>
                        </div>
                    </div>

                    <input className="messenger-left-search" placeholder="Search Chats"/>

                    <Conversations conversations={conversations} onSelectConversation={selectConversation}/>
                </div>

                <div className="messenger-right">
                    {selectedConversation && <ChatComponent user={user} conversation={selectedConversation}/>}
                </div>
            </div>
        </div>
    );
}

function CreateConversationCard({user, onClose, addConversation}: {
    user: User
    onClose: () => void
    addConversation: (conversation: Conversation) => void
}) {
    const [friends, setFriends] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    function getFriends(): User[] {
        if (!user.relations) {
            return [];
        }

        return user.relations
            .filter(relation => {
                return relation.status === RelationshipStatus.Friends || relation.status === RelationshipStatus.Favorite;
            }).map(relation => {
                return relation.user!;
            }) ?? [];
    }

    useEffect(() => {
        setFriends(getFriends());
    }, []);

    function isSelected(user: User): boolean {
        return selectedUsers.includes(user);
    }

    function onSelectUser(user: User) {
        if (isSelected(user)) {
            setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    }

    async function onCreateConversation() {
        // random conversation name
        const name = "Conversation " + Math.floor(Math.random() * 1000);

        // compile list of user ids + current user
        const userIds = selectedUsers.map(user => user.id);
        userIds.push(user.id);

        const result = await createConversation(name, userIds);
        if (!result.success) {
            toast.error("Failed to create conversation", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        // add conversation to list
        addConversation(result.data!);
        toast.success("Conversation created", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
    }

    return (
        <div className="create-conversation-card">
            <div className="create-conversation-card-container">
                <div className="create-conversation-card-container-header">
                    <p className="create-conversation-card-container-header-title">
                        New Message
                    </p>
                    <div onClick={onClose}>
                        <AiFillCloseCircle className="create-conversation-card-container-header-close"/>
                    </div>
                </div>
                <br/>

                <div className="create-conversation-card-users">
                    {friends.map(friend => {
                        return (
                            <UserCard user={friend} selected={isSelected(friend)} onSelectUser={onSelectUser}/>
                        )
                    })}
                </div>

                <div
                    className={selectedUsers.length === 0 ? "create-conversation-card-button-unavailable" : "create-conversation-card-button-available"}
                    onClick={onCreateConversation}>
                    Create Conversation
                </div>
            </div>
        </div>
    )
}

function UserCard({user, selected, onSelectUser}: {
    user: User
    selected: boolean
    onSelectUser: (user: User) => void
}) {
    const profilePicture = user.profilePicture;

    return (
        <div className="create-conversation-card-user" onClick={() => {
            onSelectUser(user);
        }}>
            {selected ? <HiCheck className="create-conversation-card-user-indicator-selected"/> :
                <BiSolidCircle className="create-conversation-card-user-indicator-unselected"/>}

            {profilePicture ? <img className="create-conversation-card-user-profile-picture" src={profilePicture}/> :
                <BiSolidUserCircle className="create-conversation-card-user-profile-picture-null"/>}

            <div className="create-conversation-card-user-right">
                <div className="create-conversation-card-user-right-name">
                    {user.firstName} {user.lastName}
                </div>
                <div className="create-conversation-card-user-right-username">
                    {user.username}
                </div>
            </div>
        </div>

    )
}

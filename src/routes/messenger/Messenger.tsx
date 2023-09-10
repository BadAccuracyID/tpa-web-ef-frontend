import {useLoaderData} from "react-router-dom";
import {Conversation, User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/messenger.scss";
import {BiSolidPlusCircle} from "react-icons/bi";
import Conversations from "../../components/messenger/Conversation.tsx";
import ChatComponent from "../../components/messenger/Chat.tsx";
import {useCallback, useEffect, useState} from "react";
import {getUserConversations} from "../../lib/controllers/messanger-controller.ts";
import {toast} from "react-toastify";

export default function MessengerPage() {
    const user = useLoaderData() as User;
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

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

    function selectConversation(conversation: Conversation) {
        setSelectedConversation(conversation);
    }

    return (
        <div>
            <NavigationBar user={user}/>

            <div className="messenger">
                <div className="messenger-left">
                    <div className="messenger-left-header">
                        <div className="messenger-left-header-text">
                            Chats
                        </div>

                        <div className="messenger-left-header-icons">
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

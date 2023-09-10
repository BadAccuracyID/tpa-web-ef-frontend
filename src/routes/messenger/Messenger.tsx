import {useLoaderData} from "react-router-dom";
import {Conversation, MessageContentType, User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/messenger.scss";
import {BiSolidPlusCircle} from "react-icons/bi";
import Conversations from "../../components/messenger/Conversation.tsx";
import ChatComponent from "../../components/messenger/Chat.tsx";

export default function MessengerPage() {
    const user = useLoaderData() as User;

    const mockConversation: Conversation = {
        id: "1",
        members: [
            {
                id: "1",
                firstName: "John",
                lastName: "Doe",
                profilePicture: "https://picsum.photos/200/300",
                username: "johndoe",
                email: "",
                activated: false,
                dateOfBirth: "",
                gender: ""
            },
            {
                id: "2",
                firstName: "Jane",
                lastName: "Doe",
                profilePicture: "https://picsum.photos/200/300",
                username: "janedoe",
                email: "",
                activated: false,
                dateOfBirth: "",
                gender: ""
            }
        ],
        messages: [{
            id: "1",
            content: "Hello",
            contentType: MessageContentType.Text,
            sender: {
                id: "1",
                firstName: "John",
                lastName: "Doe",
                profilePicture: "https://picsum.photos/200/300",
                username: "johndoe",
                email: "",
                activated: false,
                dateOfBirth: "",
                gender: ""
            },
            conversation: ""
        }],
        title: "John Doe, Jane Doe"
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

                    <Conversations user={user}/>
                </div>

                <div className="messenger-right">
                    <ChatComponent user={user} conversation={mockConversation}/>
                </div>
            </div>
        </div>
    );
}

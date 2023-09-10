import {Conversation, Message, MessageContentType, User} from "../../lib/gql/graphql.ts";
import "../../styles/messenger.scss";

export default function ChatComponent({user, conversation}: { user: User, conversation: Conversation }) {
    // export type Message = {
    //     __typename?: 'Message';
    //     content: Scalars['String']['output'];
    //     contentType: MessageContentType;
    //     conversation: Conversation;
    //     id: Scalars['ID']['output'];
    //     sender: User;
    // };
    const mockMessages: Message[] = [
        {
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
            conversation: "",
        },
        {
            id: "2",
            content: "Sup",
            contentType: MessageContentType.Text,
            sender: {
                id: "69",
                firstName: "Totally",
                lastName: "User",
                profilePicture: "https://picsum.photos/200/300",
                username: "tu",
                email: "",
                activated: false,
                dateOfBirth: "",
                gender: ""
            },
            conversation: "",
        },
    ]

    return (
        <div className="chat">
            <div className="chat">
                {
                    mockMessages.map((message) => {
                        if (message.sender.id === "69") {
                            return <BlueChatBubble message={message}/>
                        } else {
                            return <GreyChatBubble message={message}/>
                        }
                    })
                }
            </div>

            <input className="chat-input" placeholder="Aa"/>
        </div>
    )
}

// for self/user
function BlueChatBubble({message}: { message: Message }) {
    return (
        <div className="bubble">
            <div className="bubble-right">
                <div className="bubble-right-name">
                    {message.sender.firstName} {message.sender.lastName}
                </div>

                <div className="bubble-right-blue">
                    {message.content}
                </div>
            </div>

            <img
                className="bubble-picture"
                src={message.sender.profilePicture!}
                alt=""/>
        </div>
    )
}

// for other
function GreyChatBubble({message}: { message: Message }) {
    return (
        <div className="bubble">
            <img
                className="bubble-picture"
                src={message.sender.profilePicture!}
                alt=""/>

            <div className="bubble-right">
                <div className="bubble-right-name">
                    {message.sender.firstName} {message.sender.lastName}
                </div>

                <div className="bubble-right-grey">
                    {message.content}
                </div>
            </div>
        </div>
    )
}

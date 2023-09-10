import {Conversation, Message, User} from "../../lib/gql/graphql.ts";
import "../../styles/messenger.scss";

export default function ChatComponent({user, conversation}: { user: User, conversation: Conversation }) {

    function getMemberNames() {
        let names = "";
        conversation.members.forEach((member) => {
            names += member.firstName + " " + member.lastName + ", ";
        });

        return names.slice(0, -2);
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <img className="chat-header-picture"
                     src={conversation.members[0].profilePicture!}
                     alt=""/>

                <div className="chat-header-right">
                    <div className="chat-header-right-title">
                        {conversation.title}
                    </div>

                    <div className="chat-header-right-members">
                        {getMemberNames()}
                    </div>
                </div>
            </div>

            <div className="chat">
                {
                    conversation.messages.map((message) => {
                        if (message.sender.id === user.id) {
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

function BlueChatBubble({message}: { message: Message }) {
    return (
        <div className="bubble bubble-blue">
            <div className="bubble-right">
                <div className="bubble-right-name bubble-blue-right-name">
                    {message.sender.firstName} {message.sender.lastName}
                </div>

                <div className="bubble-right-content bubble-blue-right-content">
                    {message.content}
                </div>
            </div>

            <img className="bubble-picture"
                 src={message.sender.profilePicture!}
                 alt=""/>
        </div>
    );
}

function GreyChatBubble({message}: { message: Message }) {
    return (
        <div className="bubble bubble-gray">
            <img className="bubble-picture"
                 src={message.sender.profilePicture!}
                 alt=""/>

            <div className="bubble-right">
                <div className="bubble-right-name bubble-gray-right-name">
                    {message.sender.firstName} {message.sender.lastName}
                </div>

                <div className="bubble-right-content bubble-gray-right-content">
                    {message.content}
                </div>
            </div>
        </div>
    );
}


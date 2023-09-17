import {Conversation, Message, MessageContentType, Subscription, User} from "../../lib/gql/graphql.ts";
import "../../styles/messenger.scss";
import React, {useEffect, useRef, useState} from "react";
import {sendMessage, subscribeConversation} from "../../lib/controllers/messanger-controller.ts";
import {toast} from "react-toastify";

export default function ChatComponent({user, conversation}: { user: User, conversation: Conversation }) {
    const [messages, setMessages] = useState(conversation.messages);
    const [typedMessage, setTypedMessage] = useState("")
    const subscription = useRef<Subscription | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            subscribeConversation(conversation.id, (message: Message) => {
                setMessages([...messages, message]);
            }).then((response) => {
                if (!response.success) {
                    console.error(response.errorMsg);
                    return;
                }

                subscription.current = response.subscription;
            })
        };

        if (!subscription.current) {
            fetchData();
        }

        return () => {
            // Clean up the subscription
            if (subscription.current) {
                subscription.current = null;
            }
        };
    }, [messages]);

    function getMemberNames() {
        let names = "";
        conversation.members.forEach((member) => {
            names += member.firstName + " " + member.lastName + ", ";
        });

        return names.slice(0, -2);
    }

    async function onSendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            const fetched = await sendMessage(user.id, conversation.id, typedMessage, MessageContentType.Text);
            if (!fetched.success) {
                toast.error('Failed to send message', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            setTypedMessage("");
        }
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
                    messages.map((message) => {
                        if (message.sender.id === user.id) {
                            return <BlueChatBubble message={message}/>
                        } else {
                            return <GreyChatBubble message={message}/>
                        }
                    })
                }
            </div>

            <input
                className="chat-input"
                placeholder="Aa"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                onKeyDown={onSendMessage}
            />
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


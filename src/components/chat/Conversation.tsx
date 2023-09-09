import {Conversation, MessageContentType, User} from "../../lib/gql/graphql.ts";
import {useEffect, useState} from "react";
import "../../styles/chat.scss";

export default function Conversations({user}: { user: User }) {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    async function getConversations() {
        // todo: get conversations from graphql

        // mock data
        setConversations([
            {
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
            },
            {
                id: "2",
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
                        id: "3",
                        firstName: "John",
                        lastName: "Smith",
                        profilePicture: "https://picsum.photos/200/300",
                        username: "johnsmith",
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
                title: "John Doe, John Smith"
            }
        ]);
    }

    useEffect(() => {
        getConversations();
    }, []);

    return (
        <div>
            <div className="conversation-list">
                {conversations.map((conversation) => {
                    return (
                        <ConversationCard conversation={conversation}/>
                    )
                }, [])}
            </div>
        </div>
    )
}

function ConversationCard({conversation}: { conversation: Conversation }) {
    return (
        <div className="conversation-card">
            <img className="conversation-card-picture"
                 src={conversation.members[0].profilePicture!}
                 alt="conversation picture"/>

            <div className="conversation-right">
                <div className="conversation-card-right-title">
                    {conversation.title}
                </div>

                <div className="conversation-card-right-last-message">
                    {conversation.messages[conversation.messages.length - 1].sender.username}: &nbsp;
                    {conversation.messages[conversation.messages.length - 1].content}
                </div>
            </div>
        </div>
    )
}

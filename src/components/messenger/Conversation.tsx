import {Conversation} from "../../lib/gql/graphql.ts";
import "../../styles/messenger.scss";
import {BsChatDots} from "react-icons/bs";

export default function Conversations({conversations, onSelectConversation}: {
    conversations: Conversation[],
    onSelectConversation: (conversation: Conversation) => void
}) {
    return (
        <div>
            <div className="conversation-list">
                {conversations.map((conversation) => {
                    return (
                        <ConversationCard conversation={conversation} onSelect={onSelectConversation}/>
                    )
                }, [])}
            </div>
        </div>
    )
}

function ConversationCard({conversation, onSelect}: {
    conversation: Conversation,
    onSelect: (conversation: Conversation) => void
}) {
    return (
        <div className="conversation-card" onClick={() => {
            onSelect(conversation);
        }}>
            <BsChatDots className="conversation-card-picture-null"/>

            <div className="conversation-right">
                <div className="conversation-card-right-title">
                    {conversation.title}
                </div>

                {conversation.messages.length > 0 ?
                    <div className="conversation-card-right-last-message">
                        {conversation.messages[conversation.messages.length - 1].sender.username}: &nbsp;
                        {conversation.messages[conversation.messages.length - 1].content}
                    </div> : <></>
                }
            </div>
        </div>
    )
}

import {Conversation, User} from "../../lib/gql/graphql.ts";
import "../../styles/messenger.scss";

export default function ChatComponent({user, conversation}: { user: User, conversation: Conversation }) {
    return (
        <div>
            <div className="chat">
                {
                    Array.from(Array(15).keys()).map((_, index) => {
                        return (
                            <h1>{index}</h1>
                        )
                    })
                }
            </div>

            <input className="chat-input" placeholder="Aa"/>
        </div>
    )
}

import {useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/chat.scss";
import {BiSolidPlusCircle} from "react-icons/bi";

export default function ChatPage() {
    const user = useLoaderData() as User;
    // const profilePicture = user.profilePicture;

    return (
        <div>
            <NavigationBar user={user}/>

            <div className="chat">
                <div className="chat-left">
                    <div className="chat-left-header">
                        <div className="chat-left-header-text">
                            Chats
                        </div>

                        <div className="chat-left-header-icons">
                            <BiSolidPlusCircle className="chat-left-header-icons-chat"/>
                        </div>
                    </div>

                    <input className="chat-left-search" placeholder="Search Chats"/>
                </div>

                <div className="chat-right">

                </div>
            </div>
        </div>
    );
}

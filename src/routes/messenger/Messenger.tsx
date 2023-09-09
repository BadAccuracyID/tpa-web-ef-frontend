import {useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/messenger.scss";
import {BiSolidPlusCircle} from "react-icons/bi";
import Conversations from "../../components/messenger/Conversation.tsx";

export default function MessengerPage() {
    const user = useLoaderData() as User;

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

                </div>
            </div>
        </div>
    );
}

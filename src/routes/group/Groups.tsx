import {useLoaderData} from "react-router-dom";
import {Group, User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/group.scss";
import {useEffect, useState} from "react";

// show all joined groups
export default function GroupsPage() {
    const currentUser = useLoaderData() as User;
    const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

    const loadData = async () => {

    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <NavigationBar user={currentUser}/>

            <div className="groups">

            </div>

        </div>
    )
}

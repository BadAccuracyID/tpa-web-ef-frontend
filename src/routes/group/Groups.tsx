import {useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";

// show all joined groups
export default function GroupsPage() {
    const currentUser = useLoaderData() as User;

    return (
        <div>
            <NavigationBar user={currentUser}/>

        </div>
    )
}

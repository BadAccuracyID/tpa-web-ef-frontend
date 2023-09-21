import {useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";

export default function StoryPage() {
    const currentUser = useLoaderData() as User;

    return (
        <div>
            <NavigationBar user={currentUser}/>
            <h1>Story</h1>
            <h1>Story</h1>
            <h1>Story</h1>
            <h1>Story</h1>
        </div>
    )
}

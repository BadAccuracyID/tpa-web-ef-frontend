import NavigationBar from "../../components/NavigationBar.tsx";
import {useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";

export default function ReelsPage() {
    const currentUser = useLoaderData() as User;

    return (
        <div>
            <NavigationBar user={currentUser}/>
            <h1>Reels</h1>
            <h1>Reels</h1>
            <h1>Reels</h1>
            <h1>Reels</h1>
        </div>
    )
}

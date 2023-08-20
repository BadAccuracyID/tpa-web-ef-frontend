import {useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";
import NavigationBar from "../../components/NavigationBar.tsx";

export default function HomePage() {
    const user = useLoaderData() as User;

    return (
        <div>
            <NavigationBar user={user}/>
            <h1>Home Page</h1>
            <p>Welcome, {user.username}!</p>
        </div>
    )
}

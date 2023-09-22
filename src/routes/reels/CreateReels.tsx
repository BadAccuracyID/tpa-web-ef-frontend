import NavigationBar from "../../components/NavigationBar.tsx";
import {useLoaderData} from "react-router-dom";
import {User} from "../../lib/gql/graphql.ts";
import "../../styles/saya-ada-theme.scss";
import {useContext} from "react";
import {ThemeContext} from "../../lib/theme/ThemeContext.tsx";

export default function CreateReelsPage() {
    const currentUser = useLoaderData() as User;
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <div className={`app ${theme}`}>
            <NavigationBar user={currentUser}/>
            <h1>Create Reels</h1>
            <h1>Create Reels</h1>
            <h1>Create Reels</h1>
            <h1>Create Reels</h1>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    )
}

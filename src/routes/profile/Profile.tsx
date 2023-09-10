import {Await, useLoaderData, useParams} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {User} from "../../lib/gql/graphql.ts";
import {getUserById} from "../../lib/controllers/user-controller.ts";
import NavigationBar from "../../components/NavigationBar.tsx";

const nullUser: User = {
    id: '',
    username: '',
    activated: false,
    dateOfBirth: "",
    email: "",
    firstName: "User not found",
    lastName: "",
    gender: "",
}

export default function ProfilePage() {
    const currentUser = useLoaderData() as User;
    const {id} = useParams();

    async function getUser(): Promise<User> {
        if (!id) {
            return nullUser;
        }

        const response = await getUserById(id);
        if (!response.success) {
            return nullUser;
        }

        return response.data!;
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={getUser()}>
                    {(user: User) => {
                        return (
                            <div>
                                <NavigationBar user={currentUser}/>

                                <h1>Profile</h1>
                                <p>{user.username}</p>
                            </div>
                        )
                    }}
                </Await>
            </Suspense>
        </div>
    );
}

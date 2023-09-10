import {Await, useLoaderData, useParams} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {RelationshipStatus, User} from "../../lib/gql/graphql.ts";
import {getUserById} from "../../lib/controllers/user-controller.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/profile.scss";
import {BiSolidUserCircle} from "react-icons/bi";

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

    function getFriends(user: User): User[] {
        if (!user.relations) {
            return [];
        }

        return user.relations
            .filter(relation => {
                return relation.status === RelationshipStatus.Friends || relation.status === RelationshipStatus.Favorite;
            }).map(relation => {
                return relation.user!;
            }) ?? [];
    }

    function getMutualFriends(user: User): User[] {
        if (!user.relations || !currentUser.relations) {
            return [];
        }

        return getFriends(user).filter(friend => {
            return getFriends(currentUser).includes(friend);
        });
    }

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={getUser()}>
                    {(user: User) => {
                        return (
                            <div>
                                <NavigationBar user={currentUser}/>

                                <div className="profile">
                                    <div className="profile-header">
                                        <div className="profile-header-container">
                                            {user.profilePicture ?
                                                <img
                                                    src={user.profilePicture!}
                                                    className="profile-header-picture"
                                                    alt="Profile picture"
                                                />
                                                :
                                                <BiSolidUserCircle className="profile-header-null-picture"/>
                                            }

                                            <div className="profile-header-info">
                                                <div className="profile-header-info">
                                                    <div className="profile-header-info-name">
                                                        {user.firstName} {user.lastName}
                                                    </div>

                                                    <div className="profile-header-info-username">
                                                        {user.username}
                                                    </div>

                                                    <div className="profile-header-info-friends">
                                                        {getFriends(user).length} friends
                                                        | {getMutualFriends(user).length} mutual friends
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Await>
            </Suspense>
        </div>
    );
}

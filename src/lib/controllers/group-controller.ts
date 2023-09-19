// type Group implements SearchResult {
//     id: ID!
//     name: String!
//     admins: [User!]!
//     members: [User!]!
//     posts: [Post!]!
//     files: [String!]
//     visibility: GroupVisibility!
//
//     joinRequests: [User!]
//     invitedUsers: [User!]
//
// # SearchResult
//     type: ContentType
// }

// getUserGroups: [Group!]!
import {graphql} from "../gql";
import {CreateGroupInput, Group} from "../gql/graphql.ts";
import {getApolloClient} from "../../main.tsx";

const GET_USER_GROUPS_QUERY = graphql(`
    query getUserGroups {
        getUserGroups {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            posts {
                id
                title
                audience
                author {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    gender
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
                    gender
                }
                likedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
                    gender
                }
                comments {
                    id
                    holderId
                    author {
                        id
                        firstName
                        lastName
                        activated
                        username
                        email
                        dateOfBirth
                        gender
                        profilePicture
                    }
                    textContent
                    replies {
                        id
                        holderId
                        author {
                            id
                            firstName
                            lastName
                            activated
                            username
                            email
                            dateOfBirth
                            gender
                            profilePicture
                        }
                        textContent
                        likedBy {
                            id
                            firstName
                            lastName
                            activated
                            username
                            email
                            dateOfBirth
                            profilePicture
                            gender
                        }
                        createdAt
                    }
                    likedBy {
                        id
                        firstName
                        lastName
                        activated
                        username
                        email
                        dateOfBirth
                        profilePicture
                        gender
                    }
                    createdAt
                }

                textContent
                imageContent
                videoContent

                taggedUsers {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// createGroup(groupName: CreateGroupInput!): Group!
const CREATE_GROUP_MUTATION = graphql(`
    mutation createGroup($groupInput: CreateGroupInput!) {
        createGroup(input: $groupInput) {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            posts {
                id
                title
                audience
                author {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    gender
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
                    gender
                }
                likedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
                    gender
                }
                comments {
                    id
                    holderId
                    author {
                        id
                        firstName
                        lastName
                        activated
                        username
                        email
                        dateOfBirth
                        gender
                        profilePicture
                    }
                    textContent
                    replies {
                        id
                        holderId
                        author {
                            id
                            firstName
                            lastName
                            activated
                            username
                            email
                            dateOfBirth
                            gender
                            profilePicture
                        }
                        textContent
                        likedBy {
                            id
                            firstName
                            lastName
                            activated
                            username
                            email
                            dateOfBirth
                            profilePicture
                            gender
                        }
                        createdAt
                    }
                    likedBy {
                        id
                        firstName
                        lastName
                        activated
                        username
                        email
                        dateOfBirth
                        profilePicture
                        gender
                    }
                    createdAt
                }

                textContent
                imageContent
                videoContent

                taggedUsers {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

export async function getUserGroups(): Promise<ControllerResponse<Group[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_USER_GROUPS_QUERY,
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getUserGroups) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const groups: Group[] = [];
        for (const it of data.getUserGroups) {
            if (!it) {
                continue;
            }

            groups.push(it as Group);
        }

        return {
            success: true,
            errorMsg: null,
            data: groups,
        }
    } catch (error) {
        let errorMsg = 'Error executing getUserGroups';
        if (error instanceof Error) {
            console.error('Error executing getUserGroups:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function createGroup(groupInput: CreateGroupInput): Promise<ControllerResponse<Group>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: CREATE_GROUP_MUTATION,
            variables: {
                groupInput,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.createGroup) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.createGroup as Group,
        }
    } catch (error) {
        let errorMsg = 'Error executing createGroup';
        if (error instanceof Error) {
            console.error('Error executing createGroup:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

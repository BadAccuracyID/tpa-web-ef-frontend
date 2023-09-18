import {graphql} from "../gql";
import {getApolloClient} from "../../main.tsx";
import {User, UserInput} from "../gql/graphql.ts";

const GET_CURRENT_USER_QUERY = graphql(`
    query getCurrentUser {
        getCurrentUser {
            id,
            email,
            firstName,
            lastName,
            activated,
            username,
            gender,
            dateOfBirth,
            profilePicture,
            relations {
                user {
                    id,
                    email,
                    firstName,
                    lastName,
                    activated,
                    username,
                    gender,
                    dateOfBirth,
                },
                status,
            },
        }
    }
`);

// getUser(id: ID!): User!
const GET_USER_BY_ID_QUERY = graphql(`
    query getUser($id: ID!) {
        getUser(id: $id) {
            id,
            email,
            firstName,
            lastName,
            activated,
            username,
            gender,
            dateOfBirth,
            profilePicture,
            relations {
                user {
                    id,
                    email,
                    firstName,
                    lastName,
                    activated,
                    username,
                    gender,
                    dateOfBirth,
                },
                status,
            },
        }
    }
`);

// updateCurrentUser(input: UserInput!): User!
const UPDATE_CURRENT_USER_MUTATION = graphql(`
    mutation updateCurrentUser($input: UserInput!) {
        updateCurrentUser(input: $input) {
            id,
            email,
            firstName,
            lastName,
            activated,
            username,
            gender,
            dateOfBirth,
            profilePicture,
            relations {
                user {
                    id,
                    email,
                    firstName,
                    lastName,
                    activated,
                    username,
                    gender,
                    dateOfBirth,
                },
                status,
            },
        }
    }
`);


export async function getCurrentAccount(): Promise<ControllerResponse<User>> {
    // before querying the server, check for local storage token
    const token = localStorage.getItem('token');
    if (!token) {
        return {
            success: false,
            errorMsg: ['No token found'],
            data: null,
        }
    }

    // await until client is initialized, maaf ya jadi blocking :(
    while (!getApolloClient()) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_CURRENT_USER_QUERY,
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getCurrentUser) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const fetchedUser = data.getCurrentUser!;
        return {
            success: true,
            errorMsg: null,
            data: fetchedUser as User,
        }
    } catch (error) {
        let errorMsg = 'Error executing getCurrentUser';
        if (error instanceof ReferenceError) {
            return {
                success: false,
                errorMsg: ["ReferenceError: client is not defined"],
                data: null,
            }
        } else if (error instanceof Error) {
            console.error('Error executing getCurrentUser:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        }
    }
}

export async function getUserById(id: string): Promise<ControllerResponse<User>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_USER_BY_ID_QUERY,
            variables: {
                id,
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getUser) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const fetchedUser = data.getUser!;
        return {
            success: true,
            errorMsg: null,
            data: fetchedUser as User,
        };
    } catch (error) {
        let errorMsg = 'Error executing getUserById';
        if (error instanceof ReferenceError) {
            return {
                success: false,
                errorMsg: ["ReferenceError: client is not defined"],
                data: null,
            }
        } else if (error instanceof Error) {
            console.error('Error executing getUserById:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        }
    }
}

export async function updateCurrentUser(input: UserInput): Promise<ControllerResponse<User>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: UPDATE_CURRENT_USER_MUTATION,
            variables: {
                input,
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.updateCurrentUser) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const fetchedUser = data.updateCurrentUser!;
        return {
            success: true,
            errorMsg: null,
            data: fetchedUser as User,
        };
    } catch (error) {
        let errorMsg = 'Error executing updateCurrentUser';
        if (error instanceof ReferenceError) {
            return {
                success: false,
                errorMsg: ["ReferenceError: client is not defined"],
                data: null,
            }
        } else if (error instanceof Error) {
            console.error('Error executing updateCurrentUser:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        }
    }
}

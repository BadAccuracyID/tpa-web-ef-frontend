import {graphql} from "../gql";
import {getApolloClient} from "../../main.tsx";
import {User, UserInput} from "../gql/graphql.ts";
import {handleMutation, handleQuery} from "./controller.ts";

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

    return handleQuery({
        query: GET_CURRENT_USER_QUERY,
        variables: {},
    }, 'getCurrentUser', 'Error executing getCurrentUser');
}

export async function getUserById(id: string): Promise<ControllerResponse<User>> {
    return handleQuery({
        query: GET_USER_BY_ID_QUERY,
        variables: {
            id,
        },
    }, 'getUser', 'Error executing getUser');
}

export async function updateCurrentUser(input: UserInput): Promise<ControllerResponse<User>> {
    return handleMutation({
        mutation: UPDATE_CURRENT_USER_MUTATION,
        variables: {
            input,
        }
    }, 'updateCurrentUser', 'Error executing updateCurrentUser');
}

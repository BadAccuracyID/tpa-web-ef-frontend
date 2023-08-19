import {graphql} from "../gql";
import {client} from "../../main.tsx";
import {User} from "../gql/graphql.ts";

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

    try {
        const {data, errors} = await client.query({
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
        const user: User = {
            activated: fetchedUser.activated,
            dateOfBirth: fetchedUser.dateOfBirth,
            email: fetchedUser.email,
            firstName: fetchedUser.firstName,
            gender: fetchedUser.gender,
            lastName: fetchedUser.lastName,
            relations: fetchedUser.relations,
            username: fetchedUser.username,
            id: fetchedUser.id
        }

        return {
            success: true,
            errorMsg: null,
            data: user,
        }
    } catch (error) {
        let errorMsg = 'Error executing getCurrentUser';
        if (error instanceof Error) {
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

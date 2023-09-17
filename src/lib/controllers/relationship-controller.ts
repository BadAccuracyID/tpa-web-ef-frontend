import {graphql} from "../gql";
import {getApolloClient} from "../../main.tsx";
import {FriendRequest, User} from "../gql/graphql.ts";

//getFriendRequests: [FriendRequest!]!
// type FriendRequest {
//     from: ID!
//     to: ID!
//     status: RelationshipStatus!
//     createdAt: String!
// }
const GET_FRIEND_REQUESTS_QUERY = graphql(`
    query getFriendRequests {
        getFriendRequests {
            from
            to
            status
            createdAt
            fromUser {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                gender
            }
        }
    }
`)

const GET_FRIEND_RECOMMENDATIONS_QUERY = graphql(`
    query getFriendRecommendations {
        getFriendRecommendations {
            id
            firstName
            lastName
            activated
            username
            email
            dateOfBirth
            gender
        }
    }

`)

//sendFriendRequest(to: ID!): FriendRequest!
const SEND_FRIEND_REQUEST_MUTATION = graphql(`
    mutation sendFriendRequest($to: ID!) {
        sendFriendRequest(to: $to) {
            from
            to
            status
            createdAt
        }
    }
`)

//acceptFriendRequest(from: ID!): FriendRequest!
const ACCEPT_FRIEND_REQUEST_MUTATION = graphql(`
    mutation acceptFriendRequest($from: ID!) {
        acceptFriendRequest(from: $from) {
            from
            to
            status
            createdAt
        }
    }
`)

//rejectFriendRequest(from: ID!): FriendRequest!
const REJECT_FRIEND_REQUEST_MUTATION = graphql(`
    mutation rejectFriendRequest($from: ID!) {
        rejectFriendRequest(from: $from) {
            from
            to
            status
            createdAt
        }
    }
`)

//changeFriendshipStatus(to: ID!, status: String!): FriendRequest!
// enum RelationshipStatus {
//     PENDING,
//     FRIENDS,
//     DECLINED,
//     BLOCKED,
//     FAVORITE
// }
const CHANGE_FRIENDSHIP_STATUS_MUTATION = graphql(`
    mutation changeFriendshipStatus($to: ID!, $status: String!) {
        changeFriendshipStatus(to: $to, status: $status) {
            from
            to
            status
            createdAt
        }
    }
`)

export async function getFriendRequests(): Promise<ControllerResponse<FriendRequest[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_FRIEND_REQUESTS_QUERY
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getFriendRequests) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        const requests: FriendRequest[] = data.getFriendRequests;
        if (requests === null) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: requests,
        };
    } catch (error) {
        let errorMsg = 'Error executing getFriendRequests';
        if (error instanceof Error) {
            console.error('Error executing getFriendRequests:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function getFriendRecommendations(): Promise<ControllerResponse<User[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_FRIEND_RECOMMENDATIONS_QUERY
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getFriendRecommendations) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        const recommendations: User[] = data.getFriendRecommendations;
        if (!recommendations) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: recommendations
        };
    } catch (error) {
        let errorMsg = 'Error executing getFriendRecommendations';
        if (error instanceof Error) {
            console.error('Error executing getFriendRecommendations:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };

    }
}

export async function sendFriendRequest(id: string) {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: SEND_FRIEND_REQUEST_MUTATION,
            variables: {
                to: id
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.sendFriendRequest) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        const request: FriendRequest = data.sendFriendRequest;
        if (!request) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: request
        };
    } catch (error) {
        let errorMsg = 'Error executing sendFriendRequest';
        if (error instanceof Error) {
            console.error('Error executing sendFriendRequest:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function acceptFriendRequest(id: string) {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: ACCEPT_FRIEND_REQUEST_MUTATION,
            variables: {
                from: id
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.acceptFriendRequest) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        const request: FriendRequest = data.acceptFriendRequest;
        if (!request) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: request
        };
    } catch (error) {
        let errorMsg = 'Error executing acceptFriendRequest';
        if (error instanceof Error) {
            console.error('Error executing acceptFriendRequest:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function rejectFriendRequest(id: string) {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: REJECT_FRIEND_REQUEST_MUTATION,
            variables: {
                from: id
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.rejectFriendRequest) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        const request: FriendRequest = data.rejectFriendRequest;
        if (!request) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: request
        };
    } catch (error) {
        let errorMsg = 'Error executing rejectFriendRequest';
        if (error instanceof Error) {
            console.error('Error executing rejectFriendRequest:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function changeFriendshipStatus(id: string, status: string) {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: CHANGE_FRIENDSHIP_STATUS_MUTATION,
            variables: {
                to: id,
                status: status
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.changeFriendshipStatus) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        const request: FriendRequest = data.changeFriendshipStatus;
        if (!request) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: request
        };
    } catch (error) {
        let errorMsg = 'Error executing changeFriendshipStatus';
        if (error instanceof Error) {
            console.error('Error executing changeFriendshipStatus:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

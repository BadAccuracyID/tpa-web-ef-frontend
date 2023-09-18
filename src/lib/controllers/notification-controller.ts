import {graphql} from "../gql";
import {getApolloClient} from "../../main.tsx";
import {Notification} from "../gql/graphql.ts";

// getNotifications: [Notification!]!
// type Notification {
//     id: ID!
//     type: NotificationType!
//
//     content: String!
//     contentMedia: String
//     read: Boolean!
//
//     createdAt: String!
// }
const GET_NOTIFICATION_QUERY = graphql(`
    query getNotifications {
        getNotifications {
            id
            type
            content
            read
            createdAt
        }
    }
`);

// readNotification(id: ID!): Boolean!
const READ_NOTIFICATION_MUTATION = graphql(`
    mutation readNotification($id: ID!) {
        readNotification(id: $id)
    }
`);

export async function getNotifications(): Promise<ControllerResponse<Notification[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_NOTIFICATION_QUERY
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getNotifications) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        const notifications: Notification[] = [];
        for (const it of data.getNotifications) {
            if (!it) {
                continue;
            }

            notifications.push(it as Notification)
        }

        return {
            success: true,
            errorMsg: [],
            data: notifications
        }
    } catch (error) {
        let errorMsg = 'Error executing getNotifications';
        if (error instanceof Error) {
            console.error('Error executing getNotifications:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function readNotification(id: string): Promise<ControllerResponse<boolean>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: READ_NOTIFICATION_MUTATION,
            variables: {
                id
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.readNotification) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null
            }
        }

        return {
            success: true,
            errorMsg: [],
            data: data.readNotification
        }
    } catch (error) {
        let errorMsg = 'Error executing readNotification';
        if (error instanceof Error) {
            console.error('Error executing readNotification:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

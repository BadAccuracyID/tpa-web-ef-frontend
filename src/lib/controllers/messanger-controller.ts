import {graphql} from "../gql";
import {Conversation, Message, MessageContentType, Subscription} from "../gql/graphql.ts";
import {getApolloClient} from "../../main.tsx";
import {SubscriptionControllerResponse} from "../models/graphql-subscribtion-response.ts";

// getUserConversations: [Conversation!]!
// type Conversation {
//     id: ID!
//     title: String!
//     members: [User!]!
//     messages: [Message!]!
// }
//
// type Message {
//     id: ID!
//     sender: User!
//     conversation: Conversation
//     content: String!
//     contentType: MessageContentType!
// }
const GET_CONVERSATIONS_QUERY = graphql(`
    query getUserConversations {
        getUserConversations {
            id
            title
            members {
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
            messages {
                id
                sender {
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
                content
                contentType
            }
        }
    }
`)

//createConversation(input: CreateConversationInput!): Conversation!
// input CreateConversationInput {
//     title: String!
//     memberIds: [ID!]!
// }
const CREATE_CONVERSATION_MUTATION = graphql(`
    mutation createConversation($input: CreateConversationInput!) {
        createConversation(input: $input) {
            id
            title
            members {
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
            messages {
                id
                sender {
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
                content
                contentType
            }
        }
    }
`)

//sendMessage(input: SendMessageInput!): Message!
// input SendMessageInput {
//     senderId: ID!
//     conversationId: ID!
//     content: String!
//     contentType: MessageContentType!
// }
const SEND_MESSAGE_MUTATION = graphql(`
    mutation sendMessage($input: SendMessageInput!) {
        sendMessage(input: $input) {
            id
            sender {
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
            content
            contentType
        }
    }
`);

// subscribeConversation(conversationId: ID!): Message!
const SUBSCRIBE_CONVERSATION = graphql(`
    subscription subscribeConversation($conversationId: ID!) {
        subscribeConversation(conversationId: $conversationId) {
            id
            sender {
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
            content
            contentType
        }
    }
`);


export async function getUserConversations(): Promise<ControllerResponse<Conversation[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_CONVERSATIONS_QUERY,
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getUserConversations) {
            return {
                success: false,
                errorMsg: ["No conversations found"],
                data: null,
            }
        }

        const conversations: Conversation[] = [];
        for (const it of data.getUserConversations!) {
            if (it === null) {
                continue;
            }

            conversations.push(it as Conversation);
        }

        return {
            success: true,
            errorMsg: null,
            data: conversations,
        };
    } catch (error) {
        let errorMsg = "Error executing getUserConversations ";
        if (error instanceof Error) {
            console.error('Error executing getUserConversations ', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function createConversation(title: string, memberIds: string[]): Promise<ControllerResponse<Conversation>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: CREATE_CONVERSATION_MUTATION,
            variables: {
                input: {
                    title,
                    memberIds,
                }
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.createConversation) {
            return {
                success: false,
                errorMsg: ["No conversation created"],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.createConversation as Conversation,
        };
    } catch (error) {
        let errorMsg = "Error executing createConversation ";
        if (error instanceof Error) {
            console.error('Error executing createConversation ', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function sendMessage(senderId: string, conversationId: string, content: string, contentType: MessageContentType): Promise<ControllerResponse<Message>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: SEND_MESSAGE_MUTATION,
            variables: {
                input: {
                    senderId,
                    conversationId,
                    content,
                    contentType,
                }
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.sendMessage) {
            return {
                success: false,
                errorMsg: ["No message sent"],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.sendMessage,
        };
    } catch (error) {
        let errorMsg = "Error executing sendMessage ";
        if (error instanceof Error) {
            console.error('Error executing sendMessage ', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function subscribeConversation(conversationId: string, callback: (message: Message) => void): Promise<SubscriptionControllerResponse<void>> {
    try {
        const observable = getApolloClient().subscribe({
            query: SUBSCRIBE_CONVERSATION,
            variables: {
                conversationId,
            }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const subscription: Subscription = observable.subscribe({
            next: (response) => {
                if (response.errors) {
                    console.error('Error executing subscribeConversation ', response.errors);
                    return;
                }

                if (!response.data?.subscribeConversation) {
                    console.error('Error executing subscribeConversation: no data');
                    return;
                }

                callback(response.data.subscribeConversation as Message);
            },
            error: (error) => {
                console.error('Error executing subscribeConversation ', error);
            },
        });

        return {
            success: true,
            errorMsg: null,
            data: null,
            subscription: subscription,
        };
    } catch (error) {
        let errorMsg = "Error executing subscribeConversation ";
        if (error instanceof Error) {
            console.error('Error executing subscribeConversation ', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
            subscription: null,
        };
    }
}

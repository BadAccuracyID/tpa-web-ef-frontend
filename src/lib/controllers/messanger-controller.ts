import {graphql} from "../gql";
import {Conversation} from "../gql/graphql.ts";
import {getApolloClient} from "../../main.tsx";

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

            conversations.push(it);
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

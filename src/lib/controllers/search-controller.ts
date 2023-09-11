import {graphql} from "../gql";
import {SearchResult} from "../gql/graphql.ts";
import {getApolloClient} from "../../main.tsx";

const SEARCH_QUERY = graphql(`
    query search($query: String!) {
        search(query: $query) {
            type

            ... on User {
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
                type
            }

            ... on Post {
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
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
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
                    gender
                }
                comments {
                    id
                    postId
                    author {
                        id
                        firstName
                        lastName
                        activated
                        username
                        email
                        dateOfBirth
                        gender
                    }
                    textContent
                    replies {
                        id
                        postId
                        author {
                            id
                            firstName
                            lastName
                            activated
                            username
                            email
                            dateOfBirth
                            gender
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
                    gender
                }
                hashtags

                createdAt
                type
            }

            ... on Group {
                id
                type
            }
        }
    }
`);

export async function searchQuery(query: string): Promise<ControllerResponse<SearchResult[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: SEARCH_QUERY,
            variables: {
                query,
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.search) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const searchResult: SearchResult[] = [];
        for (const it of data.search!) {
            if (it === null) {
                continue;
            }

            searchResult.push(it as SearchResult);
        }

        return {
            success: true,
            errorMsg: null,
            data: searchResult,
        };
    } catch (error) {
        let errorMsg = 'Error executing searchQuery';
        if (error instanceof Error) {
            console.error('Error executing searchQuery:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

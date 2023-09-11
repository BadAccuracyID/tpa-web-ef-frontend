import {graphql} from "../gql";
import {SearchResult} from "../gql/graphql.ts";
import {getApolloClient} from "../../main.tsx";

const SEARCH_QUERY = graphql(`
    query search($query: String!) {
        search(query: $query) {
            id
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
            }

            ... on Group {
                id
            }
        }
    }
`);

export async function search(query: string): Promise<ControllerResponse<SearchResult[]>> {
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


    }
}

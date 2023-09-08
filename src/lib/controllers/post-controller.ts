import {graphql} from "../gql";
import {Post, PostInput} from "../gql/graphql.ts";
import {client} from "../../main.tsx";
import * as assert from "assert";

// getPosts(pageNumber: Int, limit: Int): PostsPage
// type Post {
//     id: ID!
//     title: String!
//     author: User!
//     audience: Audience!
//
//     sharedBy: [User!]
//     likedBy: [User!]
//     comments: [Comment!]
//
//     textContent: String
//     imageContent: [String]
//     videoContent: [String]
//
//     taggedUsers: [User!]
//     hashtags: [String!]
//
//     createdAt: String!
// }

const GET_POSTS_QUERY = graphql(`
    query getPosts($pageNumber: Int, $limit: Int) {
        getPosts(pageNumber: $pageNumber, limit: $limit) {
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
        }
    }
`);

// createPost(input: PostInput!): Post
// input PostInput {
//     title: String!
//     audience: Audience!
//
//     textContent: String!
//     imageContent: [String!]
//     videoContent: [String!]
//
//     taggedUsers: [ID!]
//     mentionedUsers: [ID!]
//     hashtags: [String!]
// }

const CREATE_POST_QUERY = graphql(`
    mutation createPost($input: PostInput!) {
        createPost(input: $input) {
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
    }
`);

export async function getPosts(pageNumber: number, limit: number): Promise<ControllerResponse<Post[]>> {
    try {
        const {data, errors} = await client.query({
            query: GET_POSTS_QUERY,
            variables: {
                pageNumber,
                limit,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getPosts) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const posts: Post[] = [];
        for (const it of data.getPosts.posts!) {
            assert(it !== null);

            const post: Post = {
                id: it.id,
                title: it.title,
                audience: it.audience,
                author: {
                    id: it.author.id,
                    email: it.author.email,
                    username: it.author.username,
                    dateOfBirth: it.author.dateOfBirth,
                    firstName: it.author.firstName,
                    lastName: it.author.lastName,
                    gender: it.author.gender,
                    activated: it.author.activated,
                },
                comments: it.comments,
                createdAt: it.createdAt,
                hashtags: it.hashtags,
                imageContent: it.imageContent,
                likedBy: it.likedBy,
                sharedBy: it.sharedBy,
                taggedUsers: it.taggedUsers,
                textContent: it.textContent,
                videoContent: it.videoContent,
            }

            posts.push(post);
        }

        return {
            success: true,
            errorMsg: null,
            data: posts,
        };
    } catch (error) {
        let errorMsg = 'Error executing getPosts';
        if (error instanceof Error) {
            console.error('Error executing getPosts:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function createPost(input: PostInput): Promise<ControllerResponse<Post>> {
    try {
        const {data, errors} = await client.mutate({
            mutation: CREATE_POST_QUERY,
            variables: {
                input,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.createPost) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const it = data.createPost;
        assert(it !== null);

        const post: Post = {
            id: it.id,
            title: it.title,
            audience: it.audience,
            author: {
                id: it.author.id,
                email: it.author.email,
                username: it.author.username,
                dateOfBirth: it.author.dateOfBirth,
                firstName: it.author.firstName,
                lastName: it.author.lastName,
                gender: it.author.gender,
                activated: it.author.activated,
            },
            comments: it.comments,
            createdAt: it.createdAt,
            hashtags: it.hashtags,
            imageContent: it.imageContent,
            likedBy: it.likedBy,
            sharedBy: it.sharedBy,
            taggedUsers: it.taggedUsers,
            textContent: it.textContent,
            videoContent: it.videoContent,
        }

        return {
            success: true,
            errorMsg: null,
            data: post,
        }

    } catch (error) {
        let errorMsg = 'Error executing createPosts';
        if (error instanceof Error) {
            console.error('Error executing createPosts:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

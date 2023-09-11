import {graphql} from "../gql";
import {Post, PostInput} from "../gql/graphql.ts";
import {getApolloClient} from "../../main.tsx";

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

//deletePost(id: ID!): Post
const DELETE_POST_MUTATION = graphql(`
    mutation deletePost($id: ID!) {
        deletePost(id: $id) {
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

// likePost(id: ID!): Post
const LIKE_POST_MUTATION = graphql(`
    mutation likePost($id: ID!) {
        likePost(id: $id) {
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

// unlikePost(id: ID!): Post
const UNLIKE_POST_MUTATION = graphql(`
    mutation unlikePost($id: ID!) {
        unlikePost(id: $id) {
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
        const {data, errors} = await getApolloClient().query({
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
            if (it === null) {
                continue;
            }

            posts.push(it as Post);
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
        const {data, errors} = await getApolloClient().mutate({
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

        const post = data.createPost;
        if (post === null) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: post as Post,
        };
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

export async function deletePost(id: string): Promise<ControllerResponse<Post>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: DELETE_POST_MUTATION,
            variables: {
                id,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.deletePost) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const post = data.deletePost;
        if (post === null) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: post as Post,
        }

    } catch (error) {
        let errorMsg = 'Error executing deletePosts';
        if (error instanceof Error) {
            console.error('Error executing deletePosts:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function likePost(id: string): Promise<ControllerResponse<Post>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: LIKE_POST_MUTATION,
            variables: {
                id,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.likePost) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const post = data.likePost;
        if (post === null) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: post as Post,
        }

    } catch (error) {
        let errorMsg = 'Error executing likePosts';
        if (error instanceof Error) {
            console.error('Error executing likePosts:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function unlikePost(id: string): Promise<ControllerResponse<Post>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: UNLIKE_POST_MUTATION,
            variables: {
                id,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.unlikePost) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const post = data.unlikePost;
        if (post === null) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: post as Post,
        }

    } catch (error) {
        let errorMsg = 'Error executing unlikePosts';
        if (error instanceof Error) {
            console.error('Error executing unlikePosts:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

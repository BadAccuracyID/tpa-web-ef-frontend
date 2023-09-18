import {graphql} from "../gql";
import {Comment, Post, PostInput} from "../gql/graphql.ts";
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
                    holderId
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
                        holderId
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

// getPost(id: ID!): Post
const GET_POST_BY_ID_QUERY = graphql(`
    query getPost($id: ID!) {
        getPost(id: $id) {
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
                holderId
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
                    holderId
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

// getPostsByUser(id: ID!, pageNumber: Int, limit: Int): PostsPage
const GET_USER_POSTS_QUERY = graphql(`
    query getPostsByUser($id: ID!, $pageNumber: Int, $limit: Int) {
        getPostsByUser(id: $id, pageNumber: $pageNumber, limit: $limit) {
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
                    holderId
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
                        holderId
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
                holderId
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
                    holderId
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
                holderId
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
                    holderId
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
                holderId
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
                    holderId
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
                holderId
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
                    holderId
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

// createComment(input: CommentInput!): Comment
const CREATE_COMMENT_MUTATION = graphql(`
    mutation createComment($input: CommentInput!) {
        createComment(input: $input) {
            id
            holderId
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
                holderId
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
    }
`);

// likeComment(id: ID!): Comment
const LIKE_COMMENT_MUTATION = graphql(`
    mutation likeComment($id: ID!) {
        likeComment(id: $id) {
            id
            holderId
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
                holderId
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
    }
`);

// unlikeComment(id: ID!): Comment
const UNLIKE_COMMENT_MUTATION = graphql(`
    mutation unlikeComment($id: ID!) {
        unlikeComment(id: $id) {
            id
            holderId
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
                holderId
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
    }
`);

// createSubComment(input: CommentInput!): Comment
const CREATE_SUB_COMMENT_MUTATION = graphql(`
    mutation createSubComment($input: CommentInput!) {
        createSubComment(input: $input) {
            id
            holderId
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
                holderId
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

export async function getPostById(id: string): Promise<ControllerResponse<Post>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_POST_BY_ID_QUERY,
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

        if (!data?.getPost) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const post = data.getPost;
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
        let errorMsg = 'Error executing getPost';
        if (error instanceof Error) {
            console.error('Error executing getPost:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function getUserPost(userId: string, pageNumber: number, limit: number): Promise<ControllerResponse<Post[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_USER_POSTS_QUERY,
            variables: {
                id: userId,
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

        if (!data?.getPostsByUser) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const posts: Post[] = [];
        for (const it of data.getPostsByUser.posts!) {
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

export async function createComment(holderId: string, content: string): Promise<ControllerResponse<Comment>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: CREATE_COMMENT_MUTATION,
            variables: {
                input: {
                    holderId: holderId,
                    textContent: content
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

        if (!data?.createComment) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.createComment! as Comment,
        }
    } catch (error) {
        let errorMsg = 'Error executing createComment';
        if (error instanceof Error) {
            console.error('Error executing createComment:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function likeComment(id: string): Promise<ControllerResponse<Comment>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: LIKE_COMMENT_MUTATION,
            variables: {
                id,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            };
        }

        if (!data?.likeComment) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            };
        }

        return {
            success: true,
            errorMsg: null,
            data: data.likeComment! as Comment,
        };
    } catch (error) {
        let errorMsg = 'Error executing likeComment';
        if (error instanceof Error) {
            console.error('Error executing likeComment:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function unlikeComment(id: string): Promise<ControllerResponse<Comment>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: UNLIKE_COMMENT_MUTATION,
            variables: {
                id,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            };
        }

        if (!data?.unlikeComment) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            };
        }

        return {
            success: true,
            errorMsg: null,
            data: data.unlikeComment! as Comment,
        };
    } catch (error) {
        let errorMsg = 'Error executing unlikeComment';
        if (error instanceof Error) {
            console.error('Error executing unlikeComment:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function createSubComment(holderId: string, content: string): Promise<ControllerResponse<Comment>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: CREATE_SUB_COMMENT_MUTATION,
            variables: {
                input: {
                    holderId: holderId,
                    textContent: content
                }
            }
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            };
        }

        if (!data?.createSubComment) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            };
        }

        return {
            success: true,
            errorMsg: null,
            data: data.createSubComment! as Comment,
        };
    } catch (error) {
        let errorMsg = 'Error executing createSubComment';
        if (error instanceof Error) {
            console.error('Error executing createSubComment:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

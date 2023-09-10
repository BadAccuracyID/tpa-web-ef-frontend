/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query login($input: LoginInput!) {\n        login(input: $input) {\n            id,\n            jwtToken,\n        }\n    }\n": types.LoginDocument,
    "\n    mutation register($input: RegisterInput!) {\n        register(input: $input) {\n            id,\n            jwtToken,\n        }\n    }\n": types.RegisterDocument,
    "\n    mutation activateUser($request: String!) {\n        activateUser(request: $request) {\n            id\n        }\n    }\n": types.ActivateUserDocument,
    "\n    query getUserConversations {\n        getUserConversations {\n            id\n            title\n            members {\n                id,\n                email,\n                firstName,\n                lastName,\n                activated,\n                username,\n                gender,\n                dateOfBirth,\n                relations {\n                    user {\n                        id,\n                        email,\n                        firstName,\n                        lastName,\n                        activated,\n                        username,\n                        gender,\n                        dateOfBirth,\n                    },\n                    status,\n                },\n            }\n            messages {\n                id\n                sender {\n                    id,\n                    email,\n                    firstName,\n                    lastName,\n                    activated,\n                    username,\n                    gender,\n                    dateOfBirth,\n                    relations {\n                        user {\n                            id,\n                            email,\n                            firstName,\n                            lastName,\n                            activated,\n                            username,\n                            gender,\n                            dateOfBirth,\n                        },\n                        status,\n                    },\n                }\n                content\n                contentType\n            }\n        }\n    }\n": types.GetUserConversationsDocument,
    "\n    query getPosts($pageNumber: Int, $limit: Int) {\n        getPosts(pageNumber: $pageNumber, limit: $limit) {\n            posts {\n                id\n                title\n                audience\n                author {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n\n                sharedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                likedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                comments {\n                    id\n                    postId\n                    author {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    textContent\n                    replies {\n                        id\n                        postId\n                        author {\n                            id\n                            firstName\n                            lastName\n                            activated\n                            username\n                            email\n                            dateOfBirth\n                            gender\n                        }\n                        textContent\n                        likedBy {\n                            id\n                            firstName\n                            lastName\n                            activated\n                            username\n                            email\n                            dateOfBirth\n                            gender\n                        }\n                        createdAt\n                    }\n                    likedBy {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    createdAt\n                }\n\n                textContent\n                imageContent\n                videoContent\n\n                taggedUsers {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                hashtags\n\n                createdAt\n            }\n        }\n    }\n": types.GetPostsDocument,
    "\n    mutation createPost($input: PostInput!) {\n        createPost(input: $input) {\n            id\n            title\n            audience\n            author {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n\n            sharedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            likedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            comments {\n                id\n                postId\n                author {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                textContent\n                replies {\n                    id\n                    postId\n                    author {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    textContent\n                    likedBy {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    createdAt\n                }\n                likedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                createdAt\n            }\n\n            textContent\n            imageContent\n            videoContent\n\n            taggedUsers {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            hashtags\n\n            createdAt\n        }\n    }\n": types.CreatePostDocument,
    "\n    mutation deletePost($id: ID!) {\n        deletePost(id: $id) {\n            id\n            title\n            audience\n            author {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n\n            sharedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            likedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            comments {\n                id\n                postId\n                author {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                textContent\n                replies {\n                    id\n                    postId\n                    author {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    textContent\n                    likedBy {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    createdAt\n                }\n                likedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                createdAt\n            }\n\n            textContent\n            imageContent\n            videoContent\n\n            taggedUsers {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            hashtags\n\n            createdAt\n        }\n    }\n": types.DeletePostDocument,
    "\n    query getCurrentUser {\n        getCurrentUser {\n            id,\n            email,\n            firstName,\n            lastName,\n            activated,\n            username,\n            gender,\n            dateOfBirth,\n            relations {\n                user {\n                    id,\n                    email,\n                    firstName,\n                    lastName,\n                    activated,\n                    username,\n                    gender,\n                    dateOfBirth,\n                },\n                status,\n            },\n        }\n    }\n": types.GetCurrentUserDocument,
    "\n    query getUser($id: ID!) {\n        getUser(id: $id) {\n            id,\n            email,\n            firstName,\n            lastName,\n            activated,\n            username,\n            gender,\n            dateOfBirth,\n            relations {\n                user {\n                    id,\n                    email,\n                    firstName,\n                    lastName,\n                    activated,\n                    username,\n                    gender,\n                    dateOfBirth,\n                },\n                status,\n            },\n        }\n    }\n": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query login($input: LoginInput!) {\n        login(input: $input) {\n            id,\n            jwtToken,\n        }\n    }\n"): (typeof documents)["\n    query login($input: LoginInput!) {\n        login(input: $input) {\n            id,\n            jwtToken,\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation register($input: RegisterInput!) {\n        register(input: $input) {\n            id,\n            jwtToken,\n        }\n    }\n"): (typeof documents)["\n    mutation register($input: RegisterInput!) {\n        register(input: $input) {\n            id,\n            jwtToken,\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation activateUser($request: String!) {\n        activateUser(request: $request) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation activateUser($request: String!) {\n        activateUser(request: $request) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUserConversations {\n        getUserConversations {\n            id\n            title\n            members {\n                id,\n                email,\n                firstName,\n                lastName,\n                activated,\n                username,\n                gender,\n                dateOfBirth,\n                relations {\n                    user {\n                        id,\n                        email,\n                        firstName,\n                        lastName,\n                        activated,\n                        username,\n                        gender,\n                        dateOfBirth,\n                    },\n                    status,\n                },\n            }\n            messages {\n                id\n                sender {\n                    id,\n                    email,\n                    firstName,\n                    lastName,\n                    activated,\n                    username,\n                    gender,\n                    dateOfBirth,\n                    relations {\n                        user {\n                            id,\n                            email,\n                            firstName,\n                            lastName,\n                            activated,\n                            username,\n                            gender,\n                            dateOfBirth,\n                        },\n                        status,\n                    },\n                }\n                content\n                contentType\n            }\n        }\n    }\n"): (typeof documents)["\n    query getUserConversations {\n        getUserConversations {\n            id\n            title\n            members {\n                id,\n                email,\n                firstName,\n                lastName,\n                activated,\n                username,\n                gender,\n                dateOfBirth,\n                relations {\n                    user {\n                        id,\n                        email,\n                        firstName,\n                        lastName,\n                        activated,\n                        username,\n                        gender,\n                        dateOfBirth,\n                    },\n                    status,\n                },\n            }\n            messages {\n                id\n                sender {\n                    id,\n                    email,\n                    firstName,\n                    lastName,\n                    activated,\n                    username,\n                    gender,\n                    dateOfBirth,\n                    relations {\n                        user {\n                            id,\n                            email,\n                            firstName,\n                            lastName,\n                            activated,\n                            username,\n                            gender,\n                            dateOfBirth,\n                        },\n                        status,\n                    },\n                }\n                content\n                contentType\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getPosts($pageNumber: Int, $limit: Int) {\n        getPosts(pageNumber: $pageNumber, limit: $limit) {\n            posts {\n                id\n                title\n                audience\n                author {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n\n                sharedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                likedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                comments {\n                    id\n                    postId\n                    author {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    textContent\n                    replies {\n                        id\n                        postId\n                        author {\n                            id\n                            firstName\n                            lastName\n                            activated\n                            username\n                            email\n                            dateOfBirth\n                            gender\n                        }\n                        textContent\n                        likedBy {\n                            id\n                            firstName\n                            lastName\n                            activated\n                            username\n                            email\n                            dateOfBirth\n                            gender\n                        }\n                        createdAt\n                    }\n                    likedBy {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    createdAt\n                }\n\n                textContent\n                imageContent\n                videoContent\n\n                taggedUsers {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                hashtags\n\n                createdAt\n            }\n        }\n    }\n"): (typeof documents)["\n    query getPosts($pageNumber: Int, $limit: Int) {\n        getPosts(pageNumber: $pageNumber, limit: $limit) {\n            posts {\n                id\n                title\n                audience\n                author {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n\n                sharedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                likedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                comments {\n                    id\n                    postId\n                    author {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    textContent\n                    replies {\n                        id\n                        postId\n                        author {\n                            id\n                            firstName\n                            lastName\n                            activated\n                            username\n                            email\n                            dateOfBirth\n                            gender\n                        }\n                        textContent\n                        likedBy {\n                            id\n                            firstName\n                            lastName\n                            activated\n                            username\n                            email\n                            dateOfBirth\n                            gender\n                        }\n                        createdAt\n                    }\n                    likedBy {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    createdAt\n                }\n\n                textContent\n                imageContent\n                videoContent\n\n                taggedUsers {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                hashtags\n\n                createdAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createPost($input: PostInput!) {\n        createPost(input: $input) {\n            id\n            title\n            audience\n            author {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n\n            sharedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            likedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            comments {\n                id\n                postId\n                author {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                textContent\n                replies {\n                    id\n                    postId\n                    author {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    textContent\n                    likedBy {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    createdAt\n                }\n                likedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                createdAt\n            }\n\n            textContent\n            imageContent\n            videoContent\n\n            taggedUsers {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            hashtags\n\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation createPost($input: PostInput!) {\n        createPost(input: $input) {\n            id\n            title\n            audience\n            author {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n\n            sharedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            likedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            comments {\n                id\n                postId\n                author {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                textContent\n                replies {\n                    id\n                    postId\n                    author {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    textContent\n                    likedBy {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    createdAt\n                }\n                likedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                createdAt\n            }\n\n            textContent\n            imageContent\n            videoContent\n\n            taggedUsers {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            hashtags\n\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deletePost($id: ID!) {\n        deletePost(id: $id) {\n            id\n            title\n            audience\n            author {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n\n            sharedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            likedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            comments {\n                id\n                postId\n                author {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                textContent\n                replies {\n                    id\n                    postId\n                    author {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    textContent\n                    likedBy {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    createdAt\n                }\n                likedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                createdAt\n            }\n\n            textContent\n            imageContent\n            videoContent\n\n            taggedUsers {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            hashtags\n\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation deletePost($id: ID!) {\n        deletePost(id: $id) {\n            id\n            title\n            audience\n            author {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n\n            sharedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            likedBy {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            comments {\n                id\n                postId\n                author {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                textContent\n                replies {\n                    id\n                    postId\n                    author {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    textContent\n                    likedBy {\n                        id\n                        firstName\n                        lastName\n                        activated\n                        username\n                        email\n                        dateOfBirth\n                        gender\n                    }\n                    createdAt\n                }\n                likedBy {\n                    id\n                    firstName\n                    lastName\n                    activated\n                    username\n                    email\n                    dateOfBirth\n                    gender\n                }\n                createdAt\n            }\n\n            textContent\n            imageContent\n            videoContent\n\n            taggedUsers {\n                id\n                firstName\n                lastName\n                activated\n                username\n                email\n                dateOfBirth\n                gender\n            }\n            hashtags\n\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCurrentUser {\n        getCurrentUser {\n            id,\n            email,\n            firstName,\n            lastName,\n            activated,\n            username,\n            gender,\n            dateOfBirth,\n            relations {\n                user {\n                    id,\n                    email,\n                    firstName,\n                    lastName,\n                    activated,\n                    username,\n                    gender,\n                    dateOfBirth,\n                },\n                status,\n            },\n        }\n    }\n"): (typeof documents)["\n    query getCurrentUser {\n        getCurrentUser {\n            id,\n            email,\n            firstName,\n            lastName,\n            activated,\n            username,\n            gender,\n            dateOfBirth,\n            relations {\n                user {\n                    id,\n                    email,\n                    firstName,\n                    lastName,\n                    activated,\n                    username,\n                    gender,\n                    dateOfBirth,\n                },\n                status,\n            },\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUser($id: ID!) {\n        getUser(id: $id) {\n            id,\n            email,\n            firstName,\n            lastName,\n            activated,\n            username,\n            gender,\n            dateOfBirth,\n            relations {\n                user {\n                    id,\n                    email,\n                    firstName,\n                    lastName,\n                    activated,\n                    username,\n                    gender,\n                    dateOfBirth,\n                },\n                status,\n            },\n        }\n    }\n"): (typeof documents)["\n    query getUser($id: ID!) {\n        getUser(id: $id) {\n            id,\n            email,\n            firstName,\n            lastName,\n            activated,\n            username,\n            gender,\n            dateOfBirth,\n            relations {\n                user {\n                    id,\n                    email,\n                    firstName,\n                    lastName,\n                    activated,\n                    username,\n                    gender,\n                    dateOfBirth,\n                },\n                status,\n            },\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
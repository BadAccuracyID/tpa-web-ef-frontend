// type Group implements SearchResult {
//     id: ID!
//     name: String!
//     admins: [User!]!
//     members: [User!]!
//     posts: [Post!]!
//     files: [String!]
//     visibility: GroupVisibility!
//
//     joinRequests: [User!]
//     invitedUsers: [User!]
//
// # SearchResult
//     type: ContentType
// }

// getUserGroups: [Group!]!
import {graphql} from "../gql";
import {CreateGroupInput, Group, Post, PostInput} from "../gql/graphql.ts";
import {getApolloClient} from "../../main.tsx";
import {DocumentNode} from "graphql/language";

const GET_USER_GROUPS_QUERY = graphql(`
    query getUserGroups {
        getUserGroups {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// getGroup(groupId: ID!): Group!
const GET_GROUP_QUERY = graphql(`
    query getGroup($groupId: ID!) {
        getGroup(groupId: $groupId) {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// createGroup(groupName: CreateGroupInput!): Group!
const CREATE_GROUP_MUTATION = graphql(`
    mutation createGroup($groupInput: CreateGroupInput!) {
        createGroup(input: $groupInput) {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// getPublicGroups: [Group!]!
const GET_PUBLIC_GROUPS_QUERY = graphql(`
    query getPublicGroups {
        getPublicGroups {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// getJoinedGroupPosts: [Post!]
const GET_JOINED_GROUP_POSTS_QUERY = graphql(`
    query getJoinedGroupPosts {
        getJoinedGroupPosts {
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
                profilePicture
            }

            sharedBy {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
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
                profilePicture
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
                    profilePicture
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
                        profilePicture
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
                        profilePicture
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
                    profilePicture
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
                profilePicture
                gender
            }
            hashtags

            createdAt
        }
    }
`);

// createGroupPost(groupId: ID!, post: PostInput!): Post!
const CREATE_GROUP_POST_MUTATION = graphql(`
    mutation createGroupPost($groupId: ID!, $post: PostInput!) {
        createGroupPost(groupId: $groupId, post: $post) {
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
                profilePicture
            }

            sharedBy {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
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
                profilePicture
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
                    profilePicture
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
                        profilePicture
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
                        profilePicture
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
                    profilePicture
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
                profilePicture
                gender
            }
            hashtags

            createdAt
        }
    }
`);

// setPicture(groupId: ID!, picture: String!): Group!
const SET_PICTURE_MUTATION = graphql(`
    mutation setPicture($groupId: ID!, $picture: String!) {
        setPicture(groupId: $groupId, picture: $picture) {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// kickMemberFromGroup(groupId: ID!, userId: ID!): Group!
const KICK_MEMBER_FROM_GROUP_MUTATION = graphql(`
    mutation kickMemberFromGroup($groupId: ID!, $userId: ID!) {
        kickMemberFromGroup(groupId: $groupId, userId: $userId) {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// acceptGroupRequest(groupId: ID!, userId: ID!): Group!
const ACCEPT_GROUP_REQUEST_MUTATION = graphql(`
    mutation acceptGroupRequest($groupId: ID!, $userId: ID!) {
        acceptGroupRequest(groupId: $groupId, userId: $userId) {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// promoteMemberToAdmin(groupId: ID!, userId: ID!): Group!
const PROMOTE_MEMBER_TO_ADMIN_MUTATION = graphql(`
    mutation promoteMemberToAdmin($groupId: ID!, $userId: ID!) {
        promoteMemberToAdmin(groupId: $groupId, userId: $userId) {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// inviteUserToGroup(groupId: ID!, userId: ID!): Group!
const INVITE_USER_TO_GROUP_MUTATION = graphql(`
    mutation inviteUserToGroup($groupId: ID!, $userId: ID!) {
        inviteUserToGroup(groupId: $groupId, userId: $userId) {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

// requestToJoinGroup(groupId: ID!): Group!
const REQUEST_TO_JOIN_GROUP_MUTATION = graphql(`
    mutation requestToJoinGroup($groupId: ID!) {
        requestToJoinGroup(groupId: $groupId) {
            id
            name
            description
            picture
            admins {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            members {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
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
                    profilePicture
                }

                sharedBy {
                    id
                    firstName
                    lastName
                    activated
                    username
                    email
                    dateOfBirth
                    profilePicture
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
                    profilePicture
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
                        profilePicture
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
                            profilePicture
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
                            profilePicture
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
                        profilePicture
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
                    profilePicture
                    gender
                }
                hashtags

                createdAt
            }
            files
            visibility
            joinRequests {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
            invitedUsers {
                id
                firstName
                lastName
                activated
                username
                email
                dateOfBirth
                profilePicture
                gender
            }
        }
    }
`);

export async function getUserGroups(): Promise<ControllerResponse<Group[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_USER_GROUPS_QUERY,
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getUserGroups) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const groups: Group[] = [];
        for (const it of data.getUserGroups) {
            if (!it) {
                continue;
            }

            groups.push(it as Group);
        }

        return {
            success: true,
            errorMsg: null,
            data: groups,
        }
    } catch (error) {
        let errorMsg = 'Error executing getUserGroups';
        if (error instanceof Error) {
            console.error('Error executing getUserGroups:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function getGroup(groupId: string): Promise<ControllerResponse<Group>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_GROUP_QUERY,
            variables: {
                groupId,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getGroup) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.getGroup as Group,
        }
    } catch (error) {
        let errorMsg = 'Error executing getGroup';
        if (error instanceof Error) {
            console.error('Error executing getGroup:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

interface MutationOptions {
    mutation: DocumentNode;
    variables: Record<string, unknown>;
}

interface QueryOptions {
    query: DocumentNode;
    variables: Record<string, unknown>;
}

async function handleMutation<T>(mutationOptions: MutationOptions, mutationName: string, errorMessage: string): Promise<ControllerResponse<T>> {
    try {
        const {data, errors} = await getApolloClient().mutate(mutationOptions);

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data[mutationName]) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data[mutationName] as T,
        }
    } catch (error) {
        let errorMsg = errorMessage;
        if (error instanceof Error) {
            console.error(`${errorMessage}:`, error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

async function handleQuery<T>(queryOptions: QueryOptions, queryName: string, errorMessage: string): Promise<ControllerResponse<T>> {
    try {
        const {data, errors} = await getApolloClient().query(queryOptions);

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data[queryName]) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data[queryName] as T,
        }
    } catch (error) {
        let errorMsg = errorMessage;
        if (error instanceof Error) {
            console.error(`${errorMessage}:`, error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function createGroup(groupInput: CreateGroupInput): Promise<ControllerResponse<Group>> {
    return handleMutation<Group>({
        mutation: CREATE_GROUP_MUTATION,
        variables: {
            group: groupInput,
        }
    }, 'createGroup', 'Error executing createGroup');
}

export async function getPublicGroups(): Promise<ControllerResponse<Group[]>> {
    return handleQuery<Group[]>({
        query: GET_PUBLIC_GROUPS_QUERY,
        variables: {},
    }, 'getPublicGroups', 'Error executing getPublicGroups');
}

export async function getJoinedGroupPosts(): Promise<ControllerResponse<Post[]>> {
    return handleQuery<Post[]>({
        query: GET_JOINED_GROUP_POSTS_QUERY,
        variables: {},
    }, 'getJoinedGroupPosts', 'Error executing getJoinedGroupPosts');
}

export async function createGroupPost(groupId: string, postInput: PostInput): Promise<ControllerResponse<Post>> {
    return handleMutation<Post>({
        mutation: CREATE_GROUP_POST_MUTATION,
        variables: {
            groupId,
            post: postInput,
        }
    }, 'createGroupPost', 'Error executing createGroupPost');
}

export async function setGroupPicture(groupId: string, picture: string): Promise<ControllerResponse<Group>> {
    return handleMutation({
        mutation: SET_PICTURE_MUTATION,
        variables: {
            groupId,
            picture,
        }
    }, 'setGroupPicture', 'Error executing setGroupPicture');
}

export async function kickMemberFromGroup(groupId: string, userId: string): Promise<ControllerResponse<Group>> {
    return handleMutation({
        mutation: KICK_MEMBER_FROM_GROUP_MUTATION,
        variables: {groupId, userId}
    }, 'kickMemberFromGroup', 'Error executing kickMemberFromGroup');
}

export async function acceptGroupRequest(groupId: string, userId: string): Promise<ControllerResponse<Group>> {
    return handleMutation({
        mutation: ACCEPT_GROUP_REQUEST_MUTATION,
        variables: {groupId, userId}
    }, 'acceptGroupRequest', 'Error executing acceptGroupRequest');
}

export async function promoteMemberToAdmin(groupId: string, userId: string): Promise<ControllerResponse<Group>> {
    return handleMutation({
        mutation: PROMOTE_MEMBER_TO_ADMIN_MUTATION,
        variables: {groupId, userId}
    }, 'promoteMemberToAdmin', 'Error executing promoteMemberToAdmin');
}

export async function inviteUserToGroup(groupId: string, userId: string): Promise<ControllerResponse<Group>> {
    return handleMutation({
        mutation: INVITE_USER_TO_GROUP_MUTATION,
        variables: {groupId, userId}
    }, 'inviteUserToGroup', 'Error executing inviteUserToGroup');
}

export async function requestToJoinGroup(groupId: string): Promise<ControllerResponse<Group>> {
    return handleMutation({
        mutation: REQUEST_TO_JOIN_GROUP_MUTATION,
        variables: {groupId}
    }, 'requestToJoinGroup', 'Error executing requestToJoinGroup');
}

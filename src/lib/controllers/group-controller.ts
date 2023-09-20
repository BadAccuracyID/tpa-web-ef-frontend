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

export async function createGroup(groupInput: CreateGroupInput): Promise<ControllerResponse<Group>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: CREATE_GROUP_MUTATION,
            variables: {
                groupInput,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.createGroup) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.createGroup as Group,
        }
    } catch (error) {
        let errorMsg = 'Error executing createGroup';
        if (error instanceof Error) {
            console.error('Error executing createGroup:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function getPublicGroups(): Promise<ControllerResponse<Group[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_PUBLIC_GROUPS_QUERY,
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getPublicGroups) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const groups: Group[] = [];
        for (const it of data.getPublicGroups) {
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
        let errorMsg = 'Error executing getPublicGroups';
        if (error instanceof Error) {
            console.error('Error executing getPublicGroups:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function getJoinedGroupPosts(): Promise<ControllerResponse<Post[]>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: GET_JOINED_GROUP_POSTS_QUERY,
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.getJoinedGroupPosts) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        const posts: Post[] = [];
        for (const it of data.getJoinedGroupPosts) {
            if (!it) {
                continue;
            }

            posts.push(it as Post);
        }

        return {
            success: true,
            errorMsg: null,
            data: posts,
        }
    } catch (error) {
        let errorMsg = 'Error executing getJoinedGroupPosts';
        if (error instanceof Error) {
            console.error('Error executing getJoinedGroupPosts:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function createGroupPost(groupId: string, postInput: PostInput): Promise<ControllerResponse<Post>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: CREATE_GROUP_POST_MUTATION,
            variables: {
                groupId,
                post: postInput,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.createGroupPost) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.createGroupPost as Post,
        }
    } catch (error) {
        let errorMsg = 'Error executing createGroupPost';
        if (error instanceof Error) {
            console.error('Error executing createGroupPost:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function setGroupPicture(groupId: string, picture: string): Promise<ControllerResponse<Group>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: SET_PICTURE_MUTATION,
            variables: {
                groupId,
                picture
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.setPicture) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.setPicture as Group,
        }
    } catch (error) {
        let errorMsg = 'Error executing setGroupPicture';
        if (error instanceof Error) {
            console.error('Error executing setGroupPicture:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function kickMemberFromGroup(groupId: string, userId: string): Promise<ControllerResponse<Group>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: KICK_MEMBER_FROM_GROUP_MUTATION,
            variables: {
                groupId,
                userId
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.kickMemberFromGroup) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.kickMemberFromGroup as Group,
        }
    } catch (error) {
        let errorMsg = 'Error executing kickMemberFromGroup';
        if (error instanceof Error) {
            console.error('Error executing kickMemberFromGroup:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function acceptGroupRequest(groupId: string, userId: string): Promise<ControllerResponse<Group>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: ACCEPT_GROUP_REQUEST_MUTATION,
            variables: {
                groupId,
                userId
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.acceptGroupRequest) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.acceptGroupRequest as Group,
        }
    } catch (error) {
        let errorMsg = 'Error executing acceptGroupRequest';
        if (error instanceof Error) {
            console.error('Error executing acceptGroupRequest:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function promoteMemberToAdmin(groupId: string, userId: string): Promise<ControllerResponse<Group>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: PROMOTE_MEMBER_TO_ADMIN_MUTATION,
            variables: {
                groupId,
                userId
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.promoteMemberToAdmin) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.promoteMemberToAdmin as Group,
        }
    } catch (error) {
        let errorMsg = 'Error executing promoteMemberToAdmin';
        if (error instanceof Error) {
            console.error('Error executing promoteMemberToAdmin:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function inviteUserToGroup(groupId: string, userId: string): Promise<ControllerResponse<Group>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: INVITE_USER_TO_GROUP_MUTATION,
            variables: {
                groupId,
                userId
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.inviteUserToGroup) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.inviteUserToGroup as Group,
        }
    } catch (error) {
        let errorMsg = 'Error executing inviteUserToGroup';
        if (error instanceof Error) {
            console.error('Error executing inviteUserToGroup:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function requestToJoinGroup(groupId: string): Promise<ControllerResponse<Group>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: REQUEST_TO_JOIN_GROUP_MUTATION,
            variables: {
                groupId,
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            };
        }

        if (!data?.requestToJoinGroup) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            };
        }

        return {
            success: true,
            errorMsg: null,
            data: data.requestToJoinGroup as Group,
        };
    } catch (error) {
        let errorMsg = 'Error executing requestToJoinGroup';
        if (error instanceof Error) {
            console.error('Error executing requestToJoinGroup:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

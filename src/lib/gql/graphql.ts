/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum Audience {
  Favorites = 'FAVORITES',
  Friends = 'FRIENDS',
  Group = 'GROUP',
  Public = 'PUBLIC'
}

export type Comment = {
  __typename?: 'Comment';
  author: User;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likedBy?: Maybe<Array<User>>;
  postId: Scalars['ID']['output'];
  replies?: Maybe<Array<Comment>>;
  textContent: Scalars['String']['output'];
};

export type CommentInput = {
  holderId: Scalars['ID']['input'];
  textContent: Scalars['String']['input'];
};

export enum ContentType {
  Group = 'GROUP',
  Post = 'POST',
  User = 'USER'
}

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID']['output'];
  members: Array<User>;
  messages: Array<Message>;
  title: Scalars['String']['output'];
};

export type CreateConversationInput = {
  memberIds: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  createdAt: Scalars['String']['output'];
  from: Scalars['ID']['output'];
  status: RelationshipStatus;
  to: Scalars['ID']['output'];
};

export type Group = SearchResult & {
  __typename?: 'Group';
  files: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  leader: User;
  members: Array<User>;
  name: Scalars['String']['output'];
  posts: Array<Post>;
  type: ContentType;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  contentType: MessageContentType;
  conversation?: Maybe<Conversation>;
  id: Scalars['ID']['output'];
  sender: User;
};

export enum MessageContentType {
  Image = 'IMAGE',
  Post = 'POST',
  Text = 'TEXT',
  Video = 'VIDEO',
  Voice = 'VOICE'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: FriendRequest;
  acceptGroupRequest: Group;
  activateUser: User;
  addMembersToGroup: Group;
  changeFriendshipStatus: FriendRequest;
  changePassword?: Maybe<User>;
  createComment?: Maybe<Comment>;
  createConversation: Conversation;
  createGroup: Group;
  createGroupFile: Group;
  createGroupPost: Post;
  createPost?: Maybe<Post>;
  createSubComment?: Maybe<Comment>;
  deleteCurrentUser: User;
  deleteGroup: Scalars['Boolean']['output'];
  deleteGroupFile: Group;
  deletePost?: Maybe<Post>;
  deleteUser: User;
  inviteUserToGroup: Group;
  likeComment?: Maybe<Comment>;
  likePost?: Maybe<Post>;
  quitGroup: Group;
  readNotification: Scalars['Boolean']['output'];
  register?: Maybe<User>;
  rejectFriendRequest: FriendRequest;
  rejectGroupRequest: Group;
  removeMembersFromGroup: Group;
  requestToJoinGroup: Group;
  sendFriendRequest: FriendRequest;
  sendMessage: Message;
  unlikeComment?: Maybe<Comment>;
  unlikePost?: Maybe<Post>;
  updateCurrentUser: User;
};


export type MutationAcceptFriendRequestArgs = {
  from: Scalars['ID']['input'];
};


export type MutationAcceptGroupRequestArgs = {
  groupId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationActivateUserArgs = {
  request: Scalars['String']['input'];
};


export type MutationAddMembersToGroupArgs = {
  groupId: Scalars['ID']['input'];
  userId: Array<Scalars['ID']['input']>;
};


export type MutationChangeFriendshipStatusArgs = {
  status: Scalars['String']['input'];
  to: Scalars['ID']['input'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationCreateGroupArgs = {
  groupName: Scalars['String']['input'];
};


export type MutationCreateGroupFileArgs = {
  fileLink: Scalars['String']['input'];
  groupId: Scalars['ID']['input'];
};


export type MutationCreateGroupPostArgs = {
  groupId: Scalars['ID']['input'];
  post: PostInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateSubCommentArgs = {
  input: CommentInput;
};


export type MutationDeleteGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationDeleteGroupFileArgs = {
  fileLink: Scalars['String']['input'];
  groupId: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInviteUserToGroupArgs = {
  groupId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLikeCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLikePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationQuitGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationReadNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRejectFriendRequestArgs = {
  from: Scalars['ID']['input'];
};


export type MutationRejectGroupRequestArgs = {
  groupId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRemoveMembersFromGroupArgs = {
  groupId: Scalars['ID']['input'];
  userId: Array<Scalars['ID']['input']>;
};


export type MutationRequestToJoinGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationSendFriendRequestArgs = {
  to: Scalars['ID']['input'];
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationUnlikeCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUnlikePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCurrentUserArgs = {
  input: UserInput;
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String']['output'];
  contentMedia: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  type: NotificationType;
};

export enum NotificationType {
  ChatChannelAdded = 'CHAT_CHANNEL_ADDED',
  Comment = 'COMMENT',
  CommentLike = 'COMMENT_LIKE',
  CommentReply = 'COMMENT_REPLY',
  Generic = 'GENERIC',
  Post = 'POST',
  PostLike = 'POST_LIKE',
  PostMention = 'POST_MENTION',
  PostTag = 'POST_TAG',
  UserRelationAccepted = 'USER_RELATION_ACCEPTED',
  UserRelationRequest = 'USER_RELATION_REQUEST'
}

export type Post = SearchResult & {
  __typename?: 'Post';
  audience: Audience;
  author: User;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['String']['output'];
  group?: Maybe<Group>;
  hashtags?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  imageContent?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  likedBy?: Maybe<Array<User>>;
  sharedBy?: Maybe<Array<User>>;
  taggedUsers?: Maybe<Array<User>>;
  textContent?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: ContentType;
  videoContent?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type PostInput = {
  audience: Audience;
  group?: InputMaybe<Scalars['ID']['input']>;
  hashtags?: InputMaybe<Array<Scalars['String']['input']>>;
  imageContent?: InputMaybe<Array<Scalars['String']['input']>>;
  mentionedUsers?: InputMaybe<Array<Scalars['ID']['input']>>;
  taggedUsers?: InputMaybe<Array<Scalars['ID']['input']>>;
  textContent: Scalars['String']['input'];
  title: Scalars['String']['input'];
  videoContent?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PostsPage = {
  __typename?: 'PostsPage';
  count?: Maybe<Scalars['Int']['output']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type Query = {
  __typename?: 'Query';
  getConversation: Conversation;
  getCurrentUser: User;
  getFriendRecommendations: Array<User>;
  getFriendRequests: Array<FriendRequest>;
  getFriends: Array<User>;
  getFriendsForUser: Array<User>;
  getGroup: Group;
  getNotifications: Array<Notification>;
  getPost?: Maybe<Post>;
  getPosts?: Maybe<PostsPage>;
  getPostsByUser?: Maybe<PostsPage>;
  getUser: User;
  getUserConversations: Array<Conversation>;
  getUserGroups: Array<Group>;
  getUserGroupsById: Array<Group>;
  login?: Maybe<User>;
  resetPasswordRequest?: Maybe<User>;
  search?: Maybe<Array<Maybe<SearchResult>>>;
  verifyResetPasswordToken?: Maybe<Scalars['String']['output']>;
};


export type QueryGetConversationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFriendsForUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type QueryGetPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPostsByUserArgs = {
  id: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserGroupsByIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryResetPasswordRequestArgs = {
  email: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  query: Scalars['String']['input'];
};


export type QueryVerifyResetPasswordTokenArgs = {
  token: Scalars['String']['input'];
};

export type RegisterInput = {
  dateOfBirth: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum RelationshipStatus {
  Blocked = 'BLOCKED',
  Declined = 'DECLINED',
  Favorite = 'FAVORITE',
  Friends = 'FRIENDS',
  Pending = 'PENDING'
}

export type SearchResult = {
  id: Scalars['ID']['output'];
  type: ContentType;
};

export type SendMessageInput = {
  content: Scalars['String']['input'];
  contentType: MessageContentType;
  conversationId: Scalars['ID']['input'];
  senderId: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeConversation: Message;
};


export type SubscriptionSubscribeConversationArgs = {
  conversationId: Scalars['ID']['input'];
};

export type User = SearchResult & {
  __typename?: 'User';
  activated: Scalars['Boolean']['output'];
  activationToken?: Maybe<Scalars['String']['output']>;
  dateOfBirth: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jwtToken?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
  relations?: Maybe<Array<UserRelationResponse>>;
  type: ContentType;
  username: Scalars['String']['output'];
};

export type UserInput = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserRelationResponse = {
  __typename?: 'UserRelationResponse';
  status: RelationshipStatus;
  user: User;
};

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename?: 'User', id: string, jwtToken?: string | null } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id: string, jwtToken?: string | null } | null };

export type ActivateUserMutationVariables = Exact<{
  request: Scalars['String']['input'];
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', activateUser: { __typename?: 'User', id: string } };

export type GetUserConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserConversationsQuery = { __typename?: 'Query', getUserConversations: Array<{ __typename?: 'Conversation', id: string, title: string, members: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null }>, messages: Array<{ __typename?: 'Message', id: string, content: string, contentType: MessageContentType, sender: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } }> }> };

export type CreateConversationMutationVariables = Exact<{
  input: CreateConversationInput;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', id: string, title: string, members: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null }>, messages: Array<{ __typename?: 'Message', id: string, content: string, contentType: MessageContentType, sender: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } }> } };

export type GetPostsQueryVariables = Exact<{
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: { __typename?: 'PostsPage', posts?: Array<{ __typename?: 'Post', id: string, title: string, audience: Audience, textContent?: string | null, imageContent?: Array<string | null> | null, videoContent?: Array<string | null> | null, hashtags?: Array<string> | null, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, sharedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, comments?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, replies?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, taggedUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null } | null> | null } | null };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string, title: string, audience: Audience, textContent?: string | null, imageContent?: Array<string | null> | null, videoContent?: Array<string | null> | null, hashtags?: Array<string> | null, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, sharedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, comments?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, replies?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, taggedUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null } | null };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: string, title: string, audience: Audience, textContent?: string | null, imageContent?: Array<string | null> | null, videoContent?: Array<string | null> | null, hashtags?: Array<string> | null, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, sharedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, comments?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, replies?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, taggedUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null } | null };

export type GetFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRequestsQuery = { __typename?: 'Query', getFriendRequests: Array<{ __typename?: 'FriendRequest', from: string, to: string, status: RelationshipStatus, createdAt: string }> };

export type GetFriendRecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRecommendationsQuery = { __typename?: 'Query', getFriendRecommendations: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> };

export type SendFriendRequestMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: { __typename?: 'FriendRequest', from: string, to: string, status: RelationshipStatus, createdAt: string } };

export type AcceptFriendRequestMutationVariables = Exact<{
  from: Scalars['ID']['input'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'FriendRequest', from: string, to: string, status: RelationshipStatus, createdAt: string } };

export type RejectFriendRequestMutationVariables = Exact<{
  from: Scalars['ID']['input'];
}>;


export type RejectFriendRequestMutation = { __typename?: 'Mutation', rejectFriendRequest: { __typename?: 'FriendRequest', from: string, to: string, status: RelationshipStatus, createdAt: string } };

export type SearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchQuery = { __typename?: 'Query', search?: Array<{ __typename?: 'Group', id: string, type: ContentType } | { __typename?: 'Post', id: string, title: string, audience: Audience, textContent?: string | null, imageContent?: Array<string | null> | null, videoContent?: Array<string | null> | null, hashtags?: Array<string> | null, createdAt: string, type: ContentType, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, sharedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, comments?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, replies?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, taggedUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null } | { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, type: ContentType, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } | null> | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jwtToken"}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jwtToken"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ActivateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"activateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ActivateUserMutation, ActivateUserMutationVariables>;
export const GetUserConversationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserConversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserConversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"relations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"relations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserConversationsQuery, GetUserConversationsQueryVariables>;
export const CreateConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateConversationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"relations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"relations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]}}]}}]} as unknown as DocumentNode<CreateConversationMutation, CreateConversationMutationVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"audience"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"imageContent"}},{"kind":"Field","name":{"kind":"Name","value":"videoContent"}},{"kind":"Field","name":{"kind":"Name","value":"taggedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"audience"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"imageContent"}},{"kind":"Field","name":{"kind":"Name","value":"videoContent"}},{"kind":"Field","name":{"kind":"Name","value":"taggedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"audience"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"imageContent"}},{"kind":"Field","name":{"kind":"Name","value":"videoContent"}},{"kind":"Field","name":{"kind":"Name","value":"taggedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const GetFriendRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFriendRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFriendRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetFriendRequestsQuery, GetFriendRequestsQueryVariables>;
export const GetFriendRecommendationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFriendRecommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFriendRecommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]}}]} as unknown as DocumentNode<GetFriendRecommendationsQuery, GetFriendRecommendationsQueryVariables>;
export const SendFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const AcceptFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"acceptFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const RejectFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"rejectFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"relations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"audience"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"imageContent"}},{"kind":"Field","name":{"kind":"Name","value":"videoContent"}},{"kind":"Field","name":{"kind":"Name","value":"taggedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hashtags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"relations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"relations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activated"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum Audience {
  Favorites = 'FAVORITES',
  Friends = 'FRIENDS',
  Group = 'GROUP',
  Public = 'PUBLIC'
}

export type Comment = {
  __typename?: 'Comment';
  author: User;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likedBy?: Maybe<Array<User>>;
  postId: Scalars['ID']['output'];
  replies?: Maybe<Array<Comment>>;
  textContent: Scalars['String']['output'];
};

export type CommentInput = {
  holderId: Scalars['ID']['input'];
  textContent: Scalars['String']['input'];
};

export enum ContentType {
  Group = 'GROUP',
  Post = 'POST',
  User = 'USER'
}

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID']['output'];
  members: Array<User>;
  messages: Array<Message>;
  title: Scalars['String']['output'];
};

export type CreateConversationInput = {
  memberIds: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  createdAt: Scalars['String']['output'];
  from: Scalars['ID']['output'];
  status: RelationshipStatus;
  to: Scalars['ID']['output'];
};

export type Group = SearchResult & {
  __typename?: 'Group';
  files: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  leader: User;
  members: Array<User>;
  name: Scalars['String']['output'];
  posts: Array<Post>;
  type: ContentType;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  contentType: MessageContentType;
  conversation?: Maybe<Conversation>;
  id: Scalars['ID']['output'];
  sender: User;
};

export enum MessageContentType {
  Image = 'IMAGE',
  Post = 'POST',
  Text = 'TEXT',
  Video = 'VIDEO',
  Voice = 'VOICE'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: FriendRequest;
  acceptGroupRequest: Group;
  activateUser: User;
  addMembersToGroup: Group;
  changeFriendshipStatus: FriendRequest;
  changePassword?: Maybe<User>;
  createComment?: Maybe<Comment>;
  createConversation: Conversation;
  createGroup: Group;
  createGroupFile: Group;
  createGroupPost: Post;
  createPost?: Maybe<Post>;
  createSubComment?: Maybe<Comment>;
  deleteCurrentUser: User;
  deleteGroup: Scalars['Boolean']['output'];
  deleteGroupFile: Group;
  deletePost?: Maybe<Post>;
  deleteUser: User;
  inviteUserToGroup: Group;
  likeComment?: Maybe<Comment>;
  likePost?: Maybe<Post>;
  quitGroup: Group;
  readNotification: Scalars['Boolean']['output'];
  register?: Maybe<User>;
  rejectFriendRequest: FriendRequest;
  rejectGroupRequest: Group;
  removeMembersFromGroup: Group;
  requestToJoinGroup: Group;
  sendFriendRequest: FriendRequest;
  sendMessage: Message;
  unlikeComment?: Maybe<Comment>;
  unlikePost?: Maybe<Post>;
  updateCurrentUser: User;
};


export type MutationAcceptFriendRequestArgs = {
  from: Scalars['ID']['input'];
};


export type MutationAcceptGroupRequestArgs = {
  groupId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationActivateUserArgs = {
  request: Scalars['String']['input'];
};


export type MutationAddMembersToGroupArgs = {
  groupId: Scalars['ID']['input'];
  userId: Array<Scalars['ID']['input']>;
};


export type MutationChangeFriendshipStatusArgs = {
  status: Scalars['String']['input'];
  to: Scalars['ID']['input'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationCreateGroupArgs = {
  groupName: Scalars['String']['input'];
};


export type MutationCreateGroupFileArgs = {
  fileLink: Scalars['String']['input'];
  groupId: Scalars['ID']['input'];
};


export type MutationCreateGroupPostArgs = {
  groupId: Scalars['ID']['input'];
  post: PostInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateSubCommentArgs = {
  input: CommentInput;
};


export type MutationDeleteGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationDeleteGroupFileArgs = {
  fileLink: Scalars['String']['input'];
  groupId: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInviteUserToGroupArgs = {
  groupId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLikeCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLikePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationQuitGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationReadNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRejectFriendRequestArgs = {
  from: Scalars['ID']['input'];
};


export type MutationRejectGroupRequestArgs = {
  groupId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRemoveMembersFromGroupArgs = {
  groupId: Scalars['ID']['input'];
  userId: Array<Scalars['ID']['input']>;
};


export type MutationRequestToJoinGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationSendFriendRequestArgs = {
  to: Scalars['ID']['input'];
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationUnlikeCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUnlikePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCurrentUserArgs = {
  input: UserInput;
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String']['output'];
  contentMedia: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  type: NotificationType;
};

export enum NotificationType {
  ChatChannelAdded = 'CHAT_CHANNEL_ADDED',
  Comment = 'COMMENT',
  CommentLike = 'COMMENT_LIKE',
  CommentReply = 'COMMENT_REPLY',
  Generic = 'GENERIC',
  Post = 'POST',
  PostLike = 'POST_LIKE',
  PostMention = 'POST_MENTION',
  PostTag = 'POST_TAG',
  UserRelationAccepted = 'USER_RELATION_ACCEPTED',
  UserRelationRequest = 'USER_RELATION_REQUEST'
}

export type Post = SearchResult & {
  __typename?: 'Post';
  audience: Audience;
  author: User;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['String']['output'];
  group?: Maybe<Group>;
  hashtags?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  imageContent?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  likedBy?: Maybe<Array<User>>;
  sharedBy?: Maybe<Array<User>>;
  taggedUsers?: Maybe<Array<User>>;
  textContent?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: ContentType;
  videoContent?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type PostInput = {
  audience: Audience;
  group?: InputMaybe<Scalars['ID']['input']>;
  hashtags?: InputMaybe<Array<Scalars['String']['input']>>;
  imageContent?: InputMaybe<Array<Scalars['String']['input']>>;
  mentionedUsers?: InputMaybe<Array<Scalars['ID']['input']>>;
  taggedUsers?: InputMaybe<Array<Scalars['ID']['input']>>;
  textContent: Scalars['String']['input'];
  title: Scalars['String']['input'];
  videoContent?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PostsPage = {
  __typename?: 'PostsPage';
  count?: Maybe<Scalars['Int']['output']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type Query = {
  __typename?: 'Query';
  getConversation: Conversation;
  getCurrentUser: User;
  getFriendRecommendations: Array<User>;
  getFriendRequests: Array<FriendRequest>;
  getFriends: Array<User>;
  getFriendsForUser: Array<User>;
  getGroup: Group;
  getNotifications: Array<Notification>;
  getPost?: Maybe<Post>;
  getPosts?: Maybe<PostsPage>;
  getPostsByUser?: Maybe<PostsPage>;
  getUser: User;
  getUserConversations: Array<Conversation>;
  getUserGroups: Array<Group>;
  getUserGroupsById: Array<Group>;
  login?: Maybe<User>;
  resetPasswordRequest?: Maybe<User>;
  search?: Maybe<Array<Maybe<SearchResult>>>;
  verifyResetPasswordToken?: Maybe<Scalars['String']['output']>;
};


export type QueryGetConversationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFriendsForUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type QueryGetPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPostsByUserArgs = {
  id: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserGroupsByIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryResetPasswordRequestArgs = {
  email: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  query: Scalars['String']['input'];
};


export type QueryVerifyResetPasswordTokenArgs = {
  token: Scalars['String']['input'];
};

export type RegisterInput = {
  dateOfBirth: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum RelationshipStatus {
  Blocked = 'BLOCKED',
  Declined = 'DECLINED',
  Favorite = 'FAVORITE',
  Friends = 'FRIENDS',
  Pending = 'PENDING'
}

export type SearchResult = {
  id: Scalars['ID']['output'];
  type: ContentType;
};

export type SendMessageInput = {
  content: Scalars['String']['input'];
  contentType: MessageContentType;
  conversationId: Scalars['ID']['input'];
  senderId: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeConversation: Message;
};


export type SubscriptionSubscribeConversationArgs = {
  conversationId: Scalars['ID']['input'];
};

export type User = SearchResult & {
  __typename?: 'User';
  activated: Scalars['Boolean']['output'];
  activationToken?: Maybe<Scalars['String']['output']>;
  dateOfBirth: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jwtToken?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
  relations?: Maybe<Array<UserRelationResponse>>;
  type: ContentType;
  username: Scalars['String']['output'];
};

export type UserInput = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserRelationResponse = {
  __typename?: 'UserRelationResponse';
  status: RelationshipStatus;
  user: User;
};

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename?: 'User', id: string, jwtToken?: string | null } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id: string, jwtToken?: string | null } | null };

export type ActivateUserMutationVariables = Exact<{
  request: Scalars['String']['input'];
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', activateUser: { __typename?: 'User', id: string } };

export type GetUserConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserConversationsQuery = { __typename?: 'Query', getUserConversations: Array<{ __typename?: 'Conversation', id: string, title: string, members: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null }>, messages: Array<{ __typename?: 'Message', id: string, content: string, contentType: MessageContentType, sender: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } }> }> };

export type CreateConversationMutationVariables = Exact<{
  input: CreateConversationInput;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', id: string, title: string, members: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null }>, messages: Array<{ __typename?: 'Message', id: string, content: string, contentType: MessageContentType, sender: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } }> } };

export type GetPostsQueryVariables = Exact<{
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: { __typename?: 'PostsPage', posts?: Array<{ __typename?: 'Post', id: string, title: string, audience: Audience, textContent?: string | null, imageContent?: Array<string | null> | null, videoContent?: Array<string | null> | null, hashtags?: Array<string> | null, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, sharedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, comments?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, replies?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, taggedUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null } | null> | null } | null };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string, title: string, audience: Audience, textContent?: string | null, imageContent?: Array<string | null> | null, videoContent?: Array<string | null> | null, hashtags?: Array<string> | null, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, sharedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, comments?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, replies?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, taggedUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null } | null };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: string, title: string, audience: Audience, textContent?: string | null, imageContent?: Array<string | null> | null, videoContent?: Array<string | null> | null, hashtags?: Array<string> | null, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, sharedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, comments?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, replies?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, taggedUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null } | null };

export type GetFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRequestsQuery = { __typename?: 'Query', getFriendRequests: Array<{ __typename?: 'FriendRequest', from: string, to: string, status: RelationshipStatus, createdAt: string }> };

export type GetFriendRecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRecommendationsQuery = { __typename?: 'Query', getFriendRecommendations: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> };

export type SendFriendRequestMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: { __typename?: 'FriendRequest', from: string, to: string, status: RelationshipStatus, createdAt: string } };

export type AcceptFriendRequestMutationVariables = Exact<{
  from: Scalars['ID']['input'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'FriendRequest', from: string, to: string, status: RelationshipStatus, createdAt: string } };

export type RejectFriendRequestMutationVariables = Exact<{
  from: Scalars['ID']['input'];
}>;


export type RejectFriendRequestMutation = { __typename?: 'Mutation', rejectFriendRequest: { __typename?: 'FriendRequest', from: string, to: string, status: RelationshipStatus, createdAt: string } };

export type SearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchQuery = { __typename?: 'Query', search?: Array<{ __typename?: 'Group', id: string, type: ContentType } | { __typename?: 'Post', id: string, title: string, audience: Audience, textContent?: string | null, imageContent?: Array<string | null> | null, videoContent?: Array<string | null> | null, hashtags?: Array<string> | null, createdAt: string, type: ContentType, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, sharedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null, comments?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, replies?: Array<{ __typename?: 'Comment', id: string, postId: string, textContent: string, createdAt: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, likedBy?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null }> | null, taggedUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, activated: boolean, username: string, email: string, dateOfBirth: string, gender: string }> | null } | { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, type: ContentType, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } | null> | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string, relations?: Array<{ __typename?: 'UserRelationResponse', status: RelationshipStatus, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, activated: boolean, username: string, gender: string, dateOfBirth: string } }> | null } };

/* eslint-disable */
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

export type Group = {
  __typename?: 'Group';
  files: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  leader: User;
  members: Array<User>;
  name: Scalars['String']['output'];
  posts: Array<Post>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  contentType: MessageContentType;
  conversation: Conversation;
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

export type Post = {
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

export type User = {
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
  relations: Array<UserRelationResponse>;
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

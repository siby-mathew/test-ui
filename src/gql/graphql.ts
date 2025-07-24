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
  /** BigInt custom scalar type */
  BigInt: { input: any; output: any; }
  /** DateTime custom scalar type */
  DateTime: { input: any; output: any; }
};

export type AddressStats = {
  __typename?: 'AddressStats';
  address: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  displayAddress: Scalars['String']['output'];
  firstMail?: Maybe<Scalars['DateTime']['output']>;
  lastMail?: Maybe<Scalars['DateTime']['output']>;
  percentage: Scalars['Float']['output'];
};

export type ApiInfo = {
  __typename?: 'ApiInfo';
  buildDate: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  environment: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uptime: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type Attachment = {
  __typename?: 'Attachment';
  contentType: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type BulkUpdateResult = {
  __typename?: 'BulkUpdateResult';
  mailIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  updatedCount: Scalars['Int']['output'];
};

export type ConversationParticipant = {
  __typename?: 'ConversationParticipant';
  address: Scalars['String']['output'];
  displayAddress: Scalars['String']['output'];
  lastInteraction: Scalars['DateTime']['output'];
  messageCount: Scalars['Int']['output'];
  relationshipType: RelationshipType;
};

export type ConversationParticipants = {
  __typename?: 'ConversationParticipants';
  address: Scalars['String']['output'];
  participants: Array<ConversationParticipant>;
  totalConversations: Scalars['Int']['output'];
};

export type CreatemailInstruction = {
  __typename?: 'CreatemailInstruction';
  acctAuthority: Scalars['String']['output'];
  acctMail: Scalars['String']['output'];
  acctMailAccountV2: Scalars['String']['output'];
  acctSystemProgram: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  fromAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  iv: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  salt: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  toAddress: Scalars['String']['output'];
  trxHash: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type CreatemailInstructionConnection = {
  __typename?: 'CreatemailInstructionConnection';
  instructions: Array<CreatemailInstruction>;
  pagination: PaginationInfo;
};

export type DailyBreakdown = {
  __typename?: 'DailyBreakdown';
  count: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
};

export type DateRange = {
  __typename?: 'DateRange';
  endDate?: Maybe<Scalars['DateTime']['output']>;
  isCustomRange: Scalars['Boolean']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
};

export type EngagementMetrics = {
  __typename?: 'EngagementMetrics';
  activeUsers: Scalars['Int']['output'];
  avgActivityPerUser: Scalars['Float']['output'];
  medianActivity: Scalars['Float']['output'];
  powerUsers: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
};

export type HealthStatus = {
  __typename?: 'HealthStatus';
  cache: Scalars['String']['output'];
  database: Scalars['String']['output'];
  status: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  uptime: Scalars['Int']['output'];
  version: Scalars['String']['output'];
};

export enum LeaderboardCategory {
  ActiveUsers = 'ACTIVE_USERS',
  All = 'ALL',
  Receivers = 'RECEIVERS',
  Senders = 'SENDERS'
}

export type LeaderboardEntry = {
  __typename?: 'LeaderboardEntry';
  address: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  displayAddress: Scalars['String']['output'];
  firstMail?: Maybe<Scalars['DateTime']['output']>;
  lastMail?: Maybe<Scalars['DateTime']['output']>;
  percentage: Scalars['Float']['output'];
  rank: Scalars['Int']['output'];
};

export type Leaderboards = {
  __typename?: 'Leaderboards';
  generatedAt: Scalars['DateTime']['output'];
  timeframe: Scalars['String']['output'];
  topReceivers: Array<LeaderboardEntry>;
  topSenders: Array<LeaderboardEntry>;
};

export type Mail = {
  __typename?: 'Mail';
  attachments: Array<Attachment>;
  body?: Maybe<Scalars['String']['output']>;
  direction?: Maybe<MailDirection>;
  fromAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isEncrypted: Scalars['Boolean']['output'];
  isRead: Scalars['Boolean']['output'];
  label?: Maybe<MailLabel>;
  labels: Array<MailLabel>;
  mailbox?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  toAddress: Scalars['String']['output'];
  version?: Maybe<Scalars['String']['output']>;
};

export type MailAccountV2RegisterEvent = {
  __typename?: 'MailAccountV2RegisterEvent';
  account: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type MailAccountV2RegisterEventConnection = {
  __typename?: 'MailAccountV2RegisterEventConnection';
  events: Array<MailAccountV2RegisterEvent>;
  pagination: PaginationInfo;
};

export type MailAccountV2UpdateEvent = {
  __typename?: 'MailAccountV2UpdateEvent';
  account: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type MailAccountV2UpdateEventConnection = {
  __typename?: 'MailAccountV2UpdateEventConnection';
  events: Array<MailAccountV2UpdateEvent>;
  pagination: PaginationInfo;
};

export type MailAnalytics = {
  __typename?: 'MailAnalytics';
  activeUserPercentage: Scalars['Float']['output'];
  avgMailsPerDay: Scalars['Float']['output'];
  dailyBreakdown: Array<DailyBreakdown>;
  dateRange: DateRange;
  engagementMetrics: EngagementMetrics;
  generatedAt: Scalars['DateTime']['output'];
  growthRate: Scalars['Float']['output'];
  mailsThisMonth: Scalars['Int']['output'];
  mailsThisWeek: Scalars['Int']['output'];
  mailsToday: Scalars['Int']['output'];
  topReceivers: Array<AddressStats>;
  topSenders: Array<AddressStats>;
  totalMails: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
  trends: TrendAnalysis;
};

export enum MailDirection {
  Incoming = 'INCOMING',
  Outgoing = 'OUTGOING'
}

export enum MailLabel {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Important = 'IMPORTANT',
  Inbox = 'INBOX',
  Outbox = 'OUTBOX',
  Sent = 'SENT',
  Spam = 'SPAM',
  Trash = 'TRASH'
}

export type MailSearchInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  fromAddress?: InputMaybe<Scalars['String']['input']>;
  hasAttachment?: InputMaybe<Scalars['Boolean']['input']>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  toAddress?: InputMaybe<Scalars['String']['input']>;
};

export type MailSearchParams = {
  __typename?: 'MailSearchParams';
  endDate?: Maybe<Scalars['DateTime']['output']>;
  fromAddress?: Maybe<Scalars['String']['output']>;
  hasAttachment?: Maybe<Scalars['Boolean']['output']>;
  isRead?: Maybe<Scalars['Boolean']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  toAddress?: Maybe<Scalars['String']['output']>;
};

export type MailSearchResult = {
  __typename?: 'MailSearchResult';
  mails: Array<Mail>;
  pagination: PaginationInfo;
  searchParams: MailSearchParams;
};

export type MailSendEvent = {
  __typename?: 'MailSendEvent';
  createdAt: Scalars['DateTime']['output'];
  fromAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  mailId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  toAddress: Scalars['String']['output'];
  trxHash: Scalars['String']['output'];
};

export type MailSendEventConnection = {
  __typename?: 'MailSendEventConnection';
  events: Array<MailSendEvent>;
  pagination: PaginationInfo;
};

export type MailSendEventInput = {
  fromAddress: Scalars['String']['input'];
  mailId: Scalars['String']['input'];
  toAddress: Scalars['String']['input'];
  trxHash: Scalars['String']['input'];
};

export type MailThread = {
  __typename?: 'MailThread';
  lastActivity: Scalars['DateTime']['output'];
  mailId: Scalars['String']['output'];
  messageCount: Scalars['Int']['output'];
  messages: Array<Mail>;
  participantCount: Scalars['Int']['output'];
};

export enum MailType {
  All = 'ALL',
  Read = 'READ',
  Received = 'RECEIVED',
  Sent = 'SENT',
  Unread = 'UNREAD'
}

export type MailV2ReadEvent = {
  __typename?: 'MailV2ReadEvent';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  mailId: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type MailV2ReadEventConnection = {
  __typename?: 'MailV2ReadEventConnection';
  events: Array<MailV2ReadEvent>;
  pagination: PaginationInfo;
};

export type MailV2SendEvent = {
  __typename?: 'MailV2SendEvent';
  createdAt: Scalars['DateTime']['output'];
  fromAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  mailId: Scalars['String']['output'];
  mailbox: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  toAddress: Scalars['String']['output'];
  trxHash: Scalars['String']['output'];
};

export type MailV2SendEventConnection = {
  __typename?: 'MailV2SendEventConnection';
  events: Array<MailV2SendEvent>;
  pagination: PaginationInfo;
};

export type MailV2SendEventInput = {
  fromAddress: Scalars['String']['input'];
  mailId: Scalars['String']['input'];
  mailbox: Scalars['String']['input'];
  toAddress: Scalars['String']['input'];
  trxHash: Scalars['String']['input'];
};

export type MailV2UpdateEvent = {
  __typename?: 'MailV2UpdateEvent';
  authority: Scalars['String']['output'];
  body?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdAtTimestamp?: Maybe<Scalars['BigInt']['output']>;
  fromAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  iv?: Maybe<Scalars['String']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  mailId: Scalars['String']['output'];
  mailbox: Scalars['String']['output'];
  markAsRead: Scalars['Boolean']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  salt?: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  toAddress: Scalars['String']['output'];
  trxHash: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type MailV2UpdateEventConnection = {
  __typename?: 'MailV2UpdateEventConnection';
  events: Array<MailV2UpdateEvent>;
  pagination: PaginationInfo;
};

export type MailV2UpdateEventInput = {
  authority: Scalars['String']['input'];
  body?: InputMaybe<Scalars['String']['input']>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  fromAddress: Scalars['String']['input'];
  iv?: InputMaybe<Scalars['String']['input']>;
  mailId: Scalars['String']['input'];
  mailbox: Scalars['String']['input'];
  markAsRead: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  salt?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  toAddress: Scalars['String']['input'];
  trxHash: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

export type MailV2UpdateLabelEvent = {
  __typename?: 'MailV2UpdateLabelEvent';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  mailId: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type MailV2UpdateLabelEventConnection = {
  __typename?: 'MailV2UpdateLabelEventConnection';
  events: Array<MailV2UpdateLabelEvent>;
  pagination: PaginationInfo;
};

export type Mutation = {
  __typename?: 'Mutation';
  bulkUpdateReadStatus: BulkUpdateResult;
  invalidateAnalyticsCache: Scalars['Boolean']['output'];
  invalidateUserCache: Scalars['Boolean']['output'];
  markMailAsRead: Scalars['Boolean']['output'];
  recordMailSendEvent: MailSendEvent;
  recordMailV2SendEvent: MailV2SendEvent;
  recordMailV2UpdateEvent: MailV2UpdateEvent;
  updateMailLabel: Scalars['Boolean']['output'];
  updateUserPreferences: UserPreferences;
};


export type MutationBulkUpdateReadStatusArgs = {
  isRead: Scalars['Boolean']['input'];
  mailIds: Array<Scalars['String']['input']>;
  userAddress: Scalars['String']['input'];
};


export type MutationInvalidateUserCacheArgs = {
  address: Scalars['String']['input'];
};


export type MutationMarkMailAsReadArgs = {
  mailId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
};


export type MutationRecordMailSendEventArgs = {
  input: MailSendEventInput;
};


export type MutationRecordMailV2SendEventArgs = {
  input: MailV2SendEventInput;
};


export type MutationRecordMailV2UpdateEventArgs = {
  input: MailV2UpdateEventInput;
};


export type MutationUpdateMailLabelArgs = {
  label: MailLabel;
  mailId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
};


export type MutationUpdateUserPreferencesArgs = {
  address: Scalars['String']['input'];
  preferences: UserPreferencesInput;
};

export type NetworkAnalysis = {
  __typename?: 'NetworkAnalysis';
  edges: Array<NetworkEdge>;
  generatedAt: Scalars['DateTime']['output'];
  nodes: Array<NetworkNode>;
  stats: NetworkStats;
};

export type NetworkEdge = {
  __typename?: 'NetworkEdge';
  firstInteraction: Scalars['DateTime']['output'];
  from: Scalars['String']['output'];
  label: Scalars['String']['output'];
  lastInteraction: Scalars['DateTime']['output'];
  to: Scalars['String']['output'];
  weight: Scalars['Int']['output'];
};

export type NetworkNode = {
  __typename?: 'NetworkNode';
  centrality: Scalars['Float']['output'];
  degree: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  incomingConnections: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  outgoingConnections: Scalars['Int']['output'];
  totalMessages: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type NetworkStats = {
  __typename?: 'NetworkStats';
  averageDegree: Scalars['Float']['output'];
  mostActiveUser: NetworkNode;
  mostConnectedUser: NetworkNode;
  totalEdges: Scalars['Int']['output'];
  totalNodes: Scalars['Int']['output'];
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  hasNext: Scalars['Boolean']['output'];
  hasPrev: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getApiInfo: ApiInfo;
  getConversationParticipants: ConversationParticipants;
  getCreatemailInstructions: CreatemailInstructionConnection;
  getLeaderboards: Leaderboards;
  getMailAccountV2RegisterEvents: MailAccountV2RegisterEventConnection;
  getMailAccountV2UpdateEvents: MailAccountV2UpdateEventConnection;
  getMailAnalytics: MailAnalytics;
  getMailSendEvents: MailSendEventConnection;
  getMailThread?: Maybe<MailThread>;
  getMailV2ReadEvents: MailV2ReadEventConnection;
  getMailV2SendEvents: MailV2SendEventConnection;
  getMailV2UpdateEvents: MailV2UpdateEventConnection;
  getMailV2UpdateLabelEvents: MailV2UpdateLabelEventConnection;
  getNetworkAnalysis: NetworkAnalysis;
  getRegisterInstructions: RegisterInstructionConnection;
  getRegisterV2Instructions: RegisterV2InstructionConnection;
  getSendmailInstructions: SendmailInstructionConnection;
  getTimeSeriesData: TimeSeriesData;
  getTopReceivers: Array<AddressStats>;
  getTopSenders: Array<AddressStats>;
  getUpdateAccountV2Instructions: UpdateAccountV2InstructionConnection;
  getUpdatemailInstructions: UpdatemailInstructionConnection;
  getUpdatemaillabelInstructions: UpdatemaillabelInstructionConnection;
  getUpdatemailreadstatusInstructions: UpdatemailreadstatusInstructionConnection;
  getUserMailbox: UserMailbox;
  getUserStats: UserStats;
  healthCheck: HealthStatus;
  searchMails: MailSearchResult;
};


export type QueryGetConversationParticipantsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  userAddress: Scalars['String']['input'];
};


export type QueryGetCreatemailInstructionsArgs = {
  fromAddress?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  toAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetLeaderboardsArgs = {
  category?: InputMaybe<LeaderboardCategory>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  timeframe?: InputMaybe<TimeFrame>;
};


export type QueryGetMailAccountV2RegisterEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMailAccountV2UpdateEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMailAnalyticsArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  includeBreakdown?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetMailSendEventsArgs = {
  fromAddress?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  toAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMailThreadArgs = {
  mailId: Scalars['String']['input'];
};


export type QueryGetMailV2ReadEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mailId?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMailV2SendEventsArgs = {
  fromAddress?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mailbox?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  toAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMailV2UpdateEventsArgs = {
  fromAddress?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mailId?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMailV2UpdateLabelEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mailId?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetNetworkAnalysisArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  minInteractions?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetRegisterInstructionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetRegisterV2InstructionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetSendmailInstructionsArgs = {
  fromAddress?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  toAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTimeSeriesDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  timeframe?: InputMaybe<TimeFrame>;
};


export type QueryGetTopReceiversArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetTopSendersArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetUpdateAccountV2InstructionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUpdatemailInstructionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUpdatemaillabelInstructionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUpdatemailreadstatusInstructionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserMailboxArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mailType?: InputMaybe<MailType>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userAddress: Scalars['String']['input'];
};


export type QueryGetUserStatsArgs = {
  userAddress: Scalars['String']['input'];
};


export type QuerySearchMailsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchParams: MailSearchInput;
};

export type RegisterInstruction = {
  __typename?: 'RegisterInstruction';
  acctAuthority: Scalars['String']['output'];
  acctMailAccount: Scalars['String']['output'];
  acctSystemProgram: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  nostrKey: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type RegisterInstructionConnection = {
  __typename?: 'RegisterInstructionConnection';
  instructions: Array<RegisterInstruction>;
  pagination: PaginationInfo;
};

export type RegisterV2Instruction = {
  __typename?: 'RegisterV2Instruction';
  acctAuthority: Scalars['String']['output'];
  acctMailAccountV2: Scalars['String']['output'];
  acctSystemProgram: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  nostrKey: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type RegisterV2InstructionConnection = {
  __typename?: 'RegisterV2InstructionConnection';
  instructions: Array<RegisterV2Instruction>;
  pagination: PaginationInfo;
};

export enum RelationshipType {
  Frequent = 'FREQUENT',
  Historical = 'HISTORICAL',
  Occasional = 'OCCASIONAL',
  Recent = 'RECENT'
}

export type SendmailInstruction = {
  __typename?: 'SendmailInstruction';
  acctAuthority: Scalars['String']['output'];
  acctMail: Scalars['String']['output'];
  acctSystemProgram: Scalars['String']['output'];
  body?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  fromAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  iv: Scalars['String']['output'];
  salt: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  toAddress: Scalars['String']['output'];
  trxHash: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type SendmailInstructionConnection = {
  __typename?: 'SendmailInstructionConnection';
  instructions: Array<SendmailInstruction>;
  pagination: PaginationInfo;
};

export type Subscription = {
  __typename?: 'Subscription';
  analyticsUpdated: MailAnalytics;
  mailRead: MailV2ReadEvent;
  mailSent: MailV2SendEvent;
  mailUpdated: MailV2UpdateEvent;
};


export type SubscriptionMailReadArgs = {
  owner?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionMailSentArgs = {
  toAddress?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionMailUpdatedArgs = {
  mailId?: InputMaybe<Scalars['String']['input']>;
};

export enum TimeFrame {
  Day = 'DAY',
  Hour = 'HOUR',
  Month = 'MONTH',
  Week = 'WEEK'
}

export type TimeSeriesData = {
  __typename?: 'TimeSeriesData';
  data: Array<TimeSeriesPoint>;
  generatedAt: Scalars['DateTime']['output'];
  summary: TimeSeriesSummary;
  timeframe: TimeFrame;
};

export type TimeSeriesPoint = {
  __typename?: 'TimeSeriesPoint';
  formattedPeriod: Scalars['String']['output'];
  growthRate: Scalars['Float']['output'];
  mailCount: Scalars['Int']['output'];
  movingAverage: Scalars['Float']['output'];
  period: Scalars['DateTime']['output'];
  uniqueReceivers: Scalars['Int']['output'];
  uniqueSenders: Scalars['Int']['output'];
};

export type TimeSeriesSummary = {
  __typename?: 'TimeSeriesSummary';
  averagePerPeriod: Scalars['Float']['output'];
  peakPeriod: TimeSeriesPoint;
  totalMails: Scalars['Int']['output'];
  totalPeriods: Scalars['Int']['output'];
};

export type TrendAnalysis = {
  __typename?: 'TrendAnalysis';
  direction: TrendDirection;
  percentage: Scalars['Float']['output'];
  previousAverage: Scalars['Float']['output'];
  recentAverage: Scalars['Float']['output'];
};

export enum TrendDirection {
  Down = 'DOWN',
  Stable = 'STABLE',
  Up = 'UP'
}

export type UpdateAccountV2Instruction = {
  __typename?: 'UpdateAccountV2Instruction';
  acctAuthority: Scalars['String']['output'];
  acctMailAccountV2: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  mailbox: Scalars['String']['output'];
  nostrKey: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type UpdateAccountV2InstructionConnection = {
  __typename?: 'UpdateAccountV2InstructionConnection';
  instructions: Array<UpdateAccountV2Instruction>;
  pagination: PaginationInfo;
};

export type UpdatemailInstruction = {
  __typename?: 'UpdatemailInstruction';
  acctAuthority: Scalars['String']['output'];
  acctMail: Scalars['String']['output'];
  acctSystemProgram: Scalars['String']['output'];
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type UpdatemailInstructionConnection = {
  __typename?: 'UpdatemailInstructionConnection';
  instructions: Array<UpdatemailInstruction>;
  pagination: PaginationInfo;
};

export type UpdatemaillabelInstruction = {
  __typename?: 'UpdatemaillabelInstruction';
  acctAuthority: Scalars['String']['output'];
  acctMail: Scalars['String']['output'];
  acctSystemProgram: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type UpdatemaillabelInstructionConnection = {
  __typename?: 'UpdatemaillabelInstructionConnection';
  instructions: Array<UpdatemaillabelInstruction>;
  pagination: PaginationInfo;
};

export type UpdatemailreadstatusInstruction = {
  __typename?: 'UpdatemailreadstatusInstruction';
  acctAuthority: Scalars['String']['output'];
  acctMail: Scalars['String']['output'];
  acctSystemProgram: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  trxHash: Scalars['String']['output'];
};

export type UpdatemailreadstatusInstructionConnection = {
  __typename?: 'UpdatemailreadstatusInstructionConnection';
  instructions: Array<UpdatemailreadstatusInstruction>;
  pagination: PaginationInfo;
};

export type UserMailbox = {
  __typename?: 'UserMailbox';
  address: Scalars['String']['output'];
  mails: Array<Mail>;
  pagination: PaginationInfo;
  stats: UserStats;
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  emailNotifications: Scalars['Boolean']['output'];
  language: Scalars['String']['output'];
  theme: Scalars['String']['output'];
  timezone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserPreferencesInput = {
  emailNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type UserStats = {
  __typename?: 'UserStats';
  address: Scalars['String']['output'];
  lastActivity?: Maybe<Scalars['DateTime']['output']>;
  readPercentage: Scalars['Float']['output'];
  registrationDate?: Maybe<Scalars['DateTime']['output']>;
  totalActivity: Scalars['Int']['output'];
  totalMailsRead: Scalars['Int']['output'];
  totalMailsReceived: Scalars['Int']['output'];
  totalMailsSent: Scalars['Int']['output'];
  unreadCount: Scalars['Int']['output'];
};

export type GetUserMailboxQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
  mailType?: InputMaybe<MailType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserMailboxQuery = { __typename?: 'Query', getUserMailbox: { __typename?: 'UserMailbox', address: string, mails: Array<{ __typename?: 'Mail', id: string, subject: string, body?: string | null, fromAddress: string, toAddress: string, isRead: boolean, parentId?: string | null, isEncrypted: boolean, version?: string | null, mailbox?: string | null, direction?: MailDirection | null }>, pagination: { __typename?: 'PaginationInfo', total?: number | null, limit: number, offset: number, hasNext: boolean, hasPrev: boolean } } };


export const GetUserMailboxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserMailbox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mailType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MailType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserMailbox"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"mailType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mailType"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"mails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"fromAddress"}},{"kind":"Field","name":{"kind":"Name","value":"toAddress"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"isEncrypted"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"mailbox"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrev"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserMailboxQuery, GetUserMailboxQueryVariables>;
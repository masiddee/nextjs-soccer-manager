export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTeamInput = {
  captainId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export enum Division {
  D1 = 'D1',
  D2 = 'D2',
  D3 = 'D3'
}

export enum FieldNumbers {
  Field_1 = 'FIELD_1',
  Field_2 = 'FIELD_2',
  Field_3 = 'FIELD_3'
}

export type Game = {
  __typename?: 'Game';
  awayTeam: Team;
  awayTeamScore?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<User>;
  field?: Maybe<FieldNumbers>;
  gameDateTime?: Maybe<Scalars['String']['output']>;
  gameResult?: Maybe<GameResult>;
  homeTeam: Team;
  homeTeamScore?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  isForfeit?: Maybe<Scalars['Boolean']['output']>;
  league?: Maybe<League>;
  modifiedAt?: Maybe<Scalars['String']['output']>;
};

export enum GameResult {
  AwayWin = 'AWAY_WIN',
  HomeWin = 'HOME_WIN',
  Tie = 'TIE'
}

export type League = {
  __typename?: 'League';
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['String']['output'];
  games?: Maybe<Array<Maybe<Game>>>;
  id: Scalars['String']['output'];
  leagueType?: Maybe<Array<Maybe<LeagueType>>>;
  location?: Maybe<Scalars['String']['output']>;
  modifiedAt?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  signupDeadline?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['String']['output'];
  status?: Maybe<LeagueStatus>;
  teams?: Maybe<Array<Maybe<Team>>>;
  teamsMax: Scalars['Int']['output'];
};

export enum LeagueStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum LeagueType {
  Coed = 'COED',
  Open = 'OPEN',
  Over_30 = 'OVER_30',
  Over_40 = 'OVER_40',
  WomenAndNonBinary = 'WOMEN_AND_NON_BINARY'
}

export type Mutation = {
  __typename?: 'Mutation';
  addPlayer?: Maybe<Team>;
  createTeam?: Maybe<Team>;
  deleteUser: Scalars['Boolean']['output'];
  removePlayer?: Maybe<Team>;
  signUp: Scalars['ID']['output'];
  updateTeam?: Maybe<Team>;
  updateUser: User;
};


export type MutationAddPlayerArgs = {
  input: PlayerInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationRemovePlayerArgs = {
  input: PlayerInput;
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateTeamArgs = {
  input: TeamInput;
};


export type MutationUpdateUserArgs = {
  userId: Scalars['String']['input'];
  userInput?: InputMaybe<UserInput>;
};

export type PlayerInput = {
  teamId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export enum PreferredPosition {
  Defender = 'DEFENDER',
  Goalie = 'GOALIE',
  Midfielder = 'MIDFIELDER',
  Striker = 'STRIKER',
  Winger = 'WINGER'
}

export type Query = {
  __typename?: 'Query';
  getAllLeagues: Array<Maybe<League>>;
  getAllTeams: Array<Maybe<Team>>;
  getAllUsers: Array<Maybe<User>>;
  getLeague?: Maybe<League>;
  getTeam?: Maybe<Team>;
  getUserByEmail: User;
  getUserById: User;
};


export type QueryGetLeagueArgs = {
  leagueId: Scalars['String']['input'];
};


export type QueryGetTeamArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String']['input'];
};

export type Team = {
  __typename?: 'Team';
  captain: User;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<User>;
  division?: Maybe<Division>;
  draws?: Maybe<Scalars['Int']['output']>;
  feeStatus?: Maybe<TeamFeeStatus>;
  gamesAwayTeam?: Maybe<Array<Maybe<Game>>>;
  gamesHomeTeam?: Maybe<Array<Maybe<Game>>>;
  id: Scalars['String']['output'];
  leagues?: Maybe<Array<Maybe<League>>>;
  losses?: Maybe<Scalars['Int']['output']>;
  modifiedAt?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  pointsAgainst?: Maybe<Scalars['Int']['output']>;
  pointsFor?: Maybe<Scalars['Int']['output']>;
  roster?: Maybe<Array<Maybe<User>>>;
  rosterMax: Scalars['Int']['output'];
  rosterMin: Scalars['Int']['output'];
  wins?: Maybe<Scalars['Int']['output']>;
};

export enum TeamFeeStatus {
  Paid = 'PAID',
  Partial = 'PARTIAL',
  Refunded = 'REFUNDED',
  Unpaid = 'UNPAID'
}

export type TeamInput = {
  captainId?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Division>;
  feeStatus?: InputMaybe<TeamFeeStatus>;
  name?: InputMaybe<Scalars['String']['input']>;
  roster?: InputMaybe<Array<InputMaybe<UserInput>>>;
};

export type User = {
  __typename?: 'User';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['String']['output']>;
  captainInterest?: Maybe<Scalars['Boolean']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  externalUserId: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<UserGender>;
  id: Scalars['String']['output'];
  inviteOtpCode?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  modifiedAt?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  preferredPosition?: Maybe<PreferredPosition>;
  skillLevel?: Maybe<UserSkill>;
  state?: Maybe<Scalars['String']['output']>;
  status?: Maybe<UserAccountStatus>;
  teams?: Maybe<Array<Maybe<Team>>>;
  userType?: Maybe<UserType>;
  zip?: Maybe<Scalars['Int']['output']>;
};

export enum UserAccountStatus {
  Declined = 'DECLINED',
  Invited = 'INVITED',
  Joined = 'JOINED'
}

export enum UserGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type UserInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['String']['input']>;
  captainInterest?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<UserGender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  skillLevel?: InputMaybe<UserSkill>;
  state?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<UserAccountStatus>;
  zip?: InputMaybe<Scalars['Int']['input']>;
};

export enum UserSkill {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export enum UserType {
  Admin = 'ADMIN',
  Captain = 'CAPTAIN',
  Player = 'PLAYER'
}

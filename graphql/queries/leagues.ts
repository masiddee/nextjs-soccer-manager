'use strict';

export const leagueTypeDefs = `#graphql
  type Query {
    getLeague(leagueId: Int!): League
  }

  type League {
    id: Int!
    name: String!
    description: String
    startDate: String!
    endDate: String!
    teams: [Team]
    teamsMax: Int!
    games: [Game]
    location: String
    leagueType: [LeagueType]
    status: LeagueStatus
    signupDeadline: String
    createdAt: String!
    createdBy: User
    modifiedAt: String
  }

  type Game {
    id: Int!
    homeTeam: Team!
    awayTeam: Team!
    homeTeamScore: Int
    awayTeamScore: Int
    field: FieldNumbers
    league: League
    gameDateTime: String
    gameResult: GameResult
    isForfeit: Boolean
    createdAt: String!
    createdBy: User
    modifiedAt: String
  }

  enum GameResult {
    HOME_WIN
    AWAY_WIN
    TIE
  }

  enum FieldNumbers {
    FIELD_1
    FIELD_2
    FIELD_3
  }

  enum LeagueType {
    OPEN
    COED
    OVER_30
    OVER_40
    WOMEN_AND_NON_BINARY
  }

  enum LeagueStatus {
    ACTIVE
    INACTIVE
  }
`;

export const leagueResolvers = {
  Query: {
    getLeague: async (parent: any, {leagueId}: any, context: any) => {
      // Check user has SUPER_ADMIN access (need to setup this auth level)
      const isSuperUser = false;

      if (!isSuperUser) {
        throw new Error('Insufficient access.');
      }
    },
  },
};

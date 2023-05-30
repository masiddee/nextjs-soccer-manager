'use strict';
import {League} from '@prisma/client';
import prisma from '../../lib/prisma';

export const leagueTypeDefs = `#graphql
  type Query {
    getLeague(leagueId: Int!): League
    getAllLeagues: [League]!
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
      // const user: User | null = (await context).user;

      // if (!user) {
      //   throw new Error('You need to be logged in to update this user');
      // }

      // if (user?.userType !== 'ADMIN') {
      //   throw new Error(
      //     'Insufficient access. Need to be an Admin to edit leagues',
      //   );
      // }

      const league: League | null = await prisma.league.findFirst({
        where: {id: leagueId},
      });

      return league;
    },
    getAllLeagues: async () => {
      const leagues: League[] = await prisma.league.findMany();

      return leagues;
    },
  },
};

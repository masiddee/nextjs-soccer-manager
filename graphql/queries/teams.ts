'use strict';
import {Prisma} from '@prisma/client';
import prisma from '../../lib/prisma';

export const teamTypeDefs = `#graphql
  type Query {
    getTeam(teamId: Int!): Team
    getAllTeams: [Team]!
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): Team
    addTeamMember(input: AddTeamMemberInput!): Team
    updateTeam(input: TeamInput!): Team
  }

  input CreateTeamInput {
    name: String!
    captainId: Int!
  }

  input AddTeamMemberInput {
    userId: Int!
    teamId: Int!
  }

  input TeamInput {
    name: String
    captainId: Int
    roster: [User]
    feeStatus: TeamFeeStatus
    division: Division
  }

  type Team {
    id: Int!
    name: String!
    captainId: Int!
    roster: [User]
    rosterMax: Int!
    rosterMin: Int!
    feeStatus: TeamFeeStatus
    division: Division
    wins: Int
    losses: Int
    draws: Int
    pointsFor: Int
    pointsAgainst: Int
    createdAt: String
    createdBy: User
  }

  enum Division {
    D1
    D2
    D3
  }

  # Prisma ORM does not currently support compoosite types for PostgreSQL
  # Movinfg these to top-level types on Team object
  # type TeamStandings {
  #   division: Int
  #   wins: Int
  #   losses: Int
  #   draws: Int
  #   pointsFor: Int
  #   pointsAgainst: Int
  # }

  enum TeamFeeStatus {
    UNPAID
    PAID
    PARTIAL
    REFUNDED
  }
`;

export const teamResolvers = {
  Query: {
    getTeam: (parent: any, {teamId}: any, context: any, info: any) =>
      prisma.team.findFirst({
        where: {id: teamId},
      }),
    getAllTeams: () => prisma.team.findMany(),
  },
  Mutation: {
    createTeam: async (parent: any, {input}: any, context: any) => {
      const user = (await context).user;

      if (!user) {
        throw new Error('You need to be logged in to create a team');
      }

      const {captainId, name} = input;
      const data: Prisma.TeamCreateInput = {
        name,
        captainId,
        roster: {connect: {id: captainId}},
        feeStatus: 'UNPAID',
        division: 'D2',
        createdBy: {connect: {id: captainId}},
      };

      return prisma.team.create({
        data,
      });
    },
    addTeamMember: async (parent: any, {input}: any, context: any) => {
      const user = (await context).user;

      if (!user) {
        throw new Error('You need to be logged in to add a team member');
      }

      const {teamId, userId} = input;

      return prisma.team.update({
        where: {
          id: teamId,
        },
        data: {
          roster: {
            connect: {id: userId},
          },
        },
      });
    },
    updateTeam: async () => console.log('UPDATE TEAM!'),
  },
};

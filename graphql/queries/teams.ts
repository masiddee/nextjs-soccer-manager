'use strict';
import {Prisma} from '@prisma/client';
import prisma from '../../lib/prisma';
import {baseUser} from '../utils/helpers.js';

export const teamTypeDefs = `#graphql
  type Query {
    # getTeam(teamId: ID!): Team
    getAllTeams: [Team]!
  }

  type Mutation {
    createTeam(input: CreateTeamFields!): Team
  }

  input CreateTeamFields {
    name: String!
    captainId: Int!
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
    getAllTeams: () => prisma.team.findMany(),
  },
  Mutation: {
    createTeam: async (parent: any, {input}: any, context: any, info: any) => {
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
  },
};

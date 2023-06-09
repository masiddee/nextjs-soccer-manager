'use strict';
import {Prisma, User} from '@prisma/client';
import prisma from '../../lib/prisma';

export const teamResolvers = {
  Query: {
    getTeam: async (parent: any, {teamId}: any, context: any, info: any) => {
      return await prisma.team.findFirst({
        where: {id: teamId},
        include: {
          captain: true,
          roster: true,
          league: true,
          createdBy: true,
        },
      })
    },
    getAllTeams: async () => {
      const teams: any = await prisma.team.findMany();

      return teams;
    },
  },
  Mutation: {
    createTeam: async (parent: any, {input}: any, context: any) => {
      const user: User | null = (await context).user;

      if (!user) {
        throw new Error('You need to be logged in to create a team');
      }

      const {captainId, name} = input;
      const data: Prisma.TeamCreateInput = {
        name,
        captain: {connect: {id: captainId}},
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
      const user: User | null = (await context).user;

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

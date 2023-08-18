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
      });
    },
    getAllTeams: async () => {
      const teams: any = await prisma.team.findMany();

      return teams;
    },
  },
  // Team: {
  //   roster: async (parent: any) => {
  //     // const __roster = await prisma.user.findMany({ include: {teams: {include: {users}}}})
  //     console.log({parent});
  //   },
  //   leagues: async () => {},
  //   gamesHomeTeam: async () => {},
  //   gamesAwayTeam: async () => {},
  // },
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
    addPlayer: async (parent: any, {input}: any, context: any) => {
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
    removePlayer: async (
      parent: any,
      {input: {userId, teamId}}: any,
      context: any,
    ) => {
      const user: User | null = (await context).user;

      if (!user) {
        throw new Error('You need to be logged in to remove a player.');
      }

      const team = await prisma.team.findFirstOrThrow({where: {id: teamId}});
      const isTeamCaptain = team.captainId === user.id;

      if (!isTeamCaptain) {
        throw new Error(
          'You must be team captain to remove this player from the team.',
        );
      }

      const updatedTeam = await prisma.team.update({
        where: {id: teamId},
        data: {
          roster: {disconnect: {id: userId}},
        },
        include: {
          captain: true,
          roster: true,
          league: true,
          createdBy: true,
        },
      });

      return updatedTeam;
    },
    updateTeam: async () => console.log('UPDATE TEAM!'),
  },
};

'use strict';
import {Prisma, User} from '@prisma/client';
import prisma from '../../lib/prisma';

export const teamResolvers = {
  Query: {
    getTeam: (parent: any, {teamId}: any, context: any, info: any) => {
      return prisma.team.findFirst({
        where: {id: teamId},
      });
    },
    getAllTeams: async () => {
      const teams: any = await prisma.team.findMany();

      console.log({teams});

      return teams;
    },
  },
  Mutation: {
    createTeam: async (parent: any, {input}: any, context: any) => {
      console.log('CREATING TEAM...');
      const user: User | null = (await context).user;

      if (!user) {
        throw new Error('You need to be logged in to create a team');
      }

      console.log('FOUND USER...', {user});

      const {captainId, name} = input;
      const data: Prisma.TeamCreateInput = {
        name,
        captain: {connect: {id: captainId}},
        roster: {connect: {id: captainId}},
        feeStatus: 'UNPAID',
        division: 'D2',
        createdBy: {connect: {id: captainId}},
      };

      console.log('TEAM DATA ---', {data});

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

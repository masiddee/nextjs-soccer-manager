'use strict';
import {User} from '@prisma/client';
import prisma from '../../lib/prisma';

export const userResolvers = {
  Query: {
    getUserById: async (
      parent: any,
      {userId}: any,
      context: any,
      info: any,
    ) => {
      return prisma.user.findFirst({
        where: {id: userId},
      });
    },
    getUserByEmail: async (
      parent: any,
      {email}: any,
      context: any,
      info: any,
    ) => {
      return prisma.user.findFirst({
        where: {email},
      });
    },
    getAllUsers: async () => prisma.user.findMany(),
  },
  Mutation: {
    signUp: async () => {
      console.log('TEST');
    },
    deleteUser: async (parent: any, {userId}: any, context: any, info: any) => {
      // const user: User | null = (await context).user;

      // if (!user) {
      //   throw new Error('You need to be logged in to update this user');
      // }

      // return prisma.user.delete({where: {id: userId}});
      console.log('DELETE USER', {userId});
    },
    updateUser: async (
      parent: any,
      {userId, userInput}: any,
      context: any,
      info: any,
    ) => {
      const user: User | null = (await context).user;

      if (!user) {
        throw new Error('You need to be logged in to update this user');
      }

      return prisma.user.update({
        where: {
          id: userId,
        },
        data: {...userInput},
      });
    },
  },
  User: {
    teams: async (parent: any) => {
      const playerTeams = await prisma.team.findMany({
        where: {roster: {some: {id: parent.id}}},
        include: {
          captain: true,
        },
      });

      return playerTeams;
    },
  },
};

'use strict';
import {User} from '@prisma/client';
import prisma from '../../lib/prisma';

export const userResolvers = {
  Query: {
    getUser: async (parent: any, {userId}: any, context: any, info: any) => {
      console.log('FIND USER!---- ');

      return prisma.user.findFirst({
        where: {id: userId},
      });
    },
    getAllUsers: async () => prisma.user.findMany(),
  },
  Mutation: {
    signUp: async () => {
      console.log('TEST');
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
};

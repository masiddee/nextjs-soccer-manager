'use strict';
import prisma from '../../lib/prisma';
import {baseUser} from '../utils/helpers';

export const userTypeDefs = `#graphql
  type Query {
    getUser(userId: Int!): User!
    getAllUsers: [User]!
  }

  type Mutation {
    signUp(email: String!): ID!
    updateUser(userId: Int!, userInput: UserInput): User!
  }

  input UserInput {
    # email: String
    firstName: String
    lastName: String
    gender: UserGenderOptions
    status: UserAccountStatus
    phone: String
    address1: String
    address2: String
    city: String
    state: String
    zip: Int
    birthDate: String
    skillLevel: UserSkillOptions
    captainInterest: Boolean
  }

  enum UserSkillOptions {
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  enum UserAccountStatus {
    INVITED
    JOINED
    DECLINED
    CAPTAIN
  }

  enum UserGenderOptions {
    MALE
    FEMALE
    OTHER
  }

  enum PreferredPositionOptions {
    GOALIE
    DEFENDER
    MIDFIELDER
    STRIKER
    WINGER
  }

  type User {
    id: Int!
    ${baseUser}
    email: String!
    phone: String
    address1: String
    address2: String
    city: String
    state: String
    zip: Int
    birthDate: String
    preferredPosition: String
    skillLevel: UserSkillOptions
    captainInterest: Boolean
    createdAt: String
    createdBy: User
  }
`;

export const userResolvers = {
  Query: {
    getUser: async (parent: any, {userId}: any, context: any, info: any) =>
      prisma.user.findFirst({
        where: {id: userId},
      }),
    getAllUsers: () => prisma.user.findMany(),
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
      const user = (await context).user;

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

'use strict';
import {User} from '@prisma/client';
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
    gender: UserGender
    status: UserAccountStatus
    phone: String
    address1: String
    address2: String
    city: String
    state: String
    zip: Int
    birthDate: String
    skillLevel: UserSkill
    captainInterest: Boolean
  }

  enum UserSkill {
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

  enum UserGender {
    MALE
    FEMALE
    OTHER
  }

  enum PreferredPosition {
    GOALIE
    DEFENDER
    MIDFIELDER
    STRIKER
    WINGER
  }

  type User {
    id: Int!
    firstName: String
    lastName: String
    gender: UserGender
    status: UserAccountStatus
    externalUserId: String!
    email: String!
    phone: String
    address1: String
    address2: String
    city: String
    state: String
    zip: Int
    birthDate: String
    preferredPosition: PreferredPosition
    skillLevel: UserSkill
    captainInterest: Boolean
    # loginsCount: Int
    # lastLogin: String
    # createdBy: User
    createdAt: String
    modifiedAt: String
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

'use strict';
import prisma from '../../lib/prisma';
import {baseUser} from '../utils/helpers';

export const userTypeDefs = `#graphql
  type Query {
    getUser(userId: ID!): User!
    getAllUsers: [User]!
  }

  type Mutation {
    signUp(email: String!): ID!
    # updateUser(userId: ID!, userInput: UserInput): User!
  }

  input UserInput {
    email: String!
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
    getUser: async (parent: any, {userId}: any, context: any, info: any) => {
      const user = prisma.user.findFirst({
        where: {id: userId},
      });

      return user;
    },
    getAllUsers: () => prisma.user.findMany(),
  },
  Mutation: {
    signUp: async (email: any) => {
      console.log('TEST');
    },
  },
};

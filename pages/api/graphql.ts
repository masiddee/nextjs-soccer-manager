import {createSchema, createYoga} from 'graphql-yoga';
import type {NextApiRequest, NextApiResponse} from 'next';
import {userTypeDefs, userResolvers} from '@/graphql/queries/users';
import {teamTypeDefs, teamResolvers} from '@/graphql/queries/teams';
import {createContext} from '@/graphql/context';
import merge from 'lodash.merge';
import {mergeTypeDefs} from '@graphql-tools/merge';

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: createSchema({
    typeDefs: [teamTypeDefs, userTypeDefs],
    resolvers: merge(userResolvers, teamResolvers),
  }),
  context: createContext,
  graphqlEndpoint: '/api/graphql',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

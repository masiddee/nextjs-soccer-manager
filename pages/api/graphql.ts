import {createSchema, createYoga} from 'graphql-yoga';
import type {NextApiRequest, NextApiResponse} from 'next';
import {userResolvers} from '@/graphql/queries/users';
import {teamResolvers} from '@/graphql/queries/teams';
import {leagueResolvers} from '@/graphql/queries/leagues';
import {createContext} from '@/graphql/context';
import merge from 'lodash.merge';
import typeDefs from '@/graphql/config';

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: createSchema({
    typeDefs,
    resolvers: merge(userResolvers, teamResolvers, leagueResolvers),
  }),
  context: createContext,
  graphqlEndpoint: '/api/graphql',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

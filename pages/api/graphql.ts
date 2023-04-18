// pages/api/graphql.ts

import { createSchema, createYoga } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';
import {  userTypeDefs as typeDefs, userResolvers as resolvers } from '../../graphql/queries/users';


export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema: createSchema({
    typeDefs,
    resolvers
  }),
  graphqlEndpoint: '/api/graphql'
})

export const config = {
  api: {
    bodyParser: false
  }
}
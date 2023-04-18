'use strict'
import { baseUserDetails } from '../utils/helpers.js';

const teamTypeDefs = `#graphql
  type Query {
    getTeamDetails(teamId: ID!): TeamDetails
  }

  type Mutation {
    addTeam(addTeamFields: AddTeamFields!): TeamDetails
  }

  input AddTeamFields {
    name: String!
    captainId: ID!
  }

  type TeamDetails {
    id: ID!
    name: String!
    captainId: ID!
    roster: [RosterPlayer]
    rosterMax: Int!
    rosterMin: Int!
    status: String
    fee: Int
    standings: TeamStandings
    createdAt: Int
    createdBy: String
    modifiedAt: Int
    modifiedBy: String
  }

  type TeamStandings {
    division: Int
    wins: Int
    losses: Int
    draws: Int
    pointsFor: Int
    pointsAgainst: Int
  }

  type RosterPlayer {
    userId: ID!
    ${baseUserDetails}
  }
`

const teamResolvers = {
  Query: {},
  Mutation: {},
}

module.exports = {typeDefs: teamTypeDefs, resolvers: teamResolvers}
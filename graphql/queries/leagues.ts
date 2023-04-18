'use strict';

const leagueTypeDefs = `#graphql
  type Query {
    getLeagueDetails(leagueId: ID!): LeagueDetails
  }

  type LeagueDetails {
    id: ID!
    name: String!
    description: String!
    startDate: String!
    endDate: String!
    teams: [TeamDetails]
    teamsMax: Int!
    games: [GameDetails]
    location: String
    attributes: LeagueAttributes
    createdAt: Int
    createdBy: String
    modifiedAt: Int
    modifiedBy: String
  }

  type LeagueAttributes {
    leagueType: [LeagueType]
  }

  type GameDetails {
    gameDateTimes: String
    homeTeam: teamId!
    awayTeam: teamId!
    homeTeamScore: Int
    awayTeamScore: Int
    field: FieldNumbers
    isForfeited: Boolean!
  }

  enum FieldNumbers {
    FIELD_1
    FIELD_2
    FIELD_3
  }

  enum LeagueType {
    OPEN
    COED
    OVER_30
    OVER_40
    WOMEN_AND_NON_BINARY
  }
`

const leagueResolvers = {
  Query: {
    
  }
}

export default {typeDefs: leagueTypeDefs, resolvers: leagueResolvers}
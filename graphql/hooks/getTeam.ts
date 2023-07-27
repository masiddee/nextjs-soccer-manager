import {gql, useQuery} from '@apollo/client';

const GET_TEAM_DETAILS_QUERY = gql`
  query getTeamDetailsQuery($teamId: Int!) {
    getTeam(teamId: $teamId) {
      id
      name
      captain {
        firstName
        lastName
      }
      roster {
        id
        email
        firstName
        lastName
        preferredPosition
        status
        skillLevel
      }
      rosterMax
      rosterMin
      feeStatus
      division
      wins
      losses
      draws
      pointsFor
      pointsAgainst
      gamesHomeTeam {
        id
        homeTeamScore
      }
      leagues {
        name
      }
      createdAt
      modifiedAt
    }
  }
`;

export const useGetTeamDetailsQuery = (teamId: number) =>
  useQuery(GET_TEAM_DETAILS_QUERY, {
    variables: {teamId},
  });

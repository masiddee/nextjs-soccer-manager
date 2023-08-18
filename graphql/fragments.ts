import {gql} from '@apollo/client';

export const TEAM_ROSTER_FRAGMENT = gql`
  fragment teamRosterFields on Team {
    id
    roster {
      id
      email
      firstName
      lastName
      preferredPosition
      status
      skillLevel
    }
  }
`;

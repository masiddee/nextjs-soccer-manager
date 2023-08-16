import {gql, useQuery} from '@apollo/client';

const GET_PLAYER_DETAILS_BY_ID_QUERY = gql`
  query getPlayerDetailsByIdQuery($userId: String!) {
    getUserById(userId: $userId) {
      id
      firstName
      lastName
      gender
      email
      preferredPosition
      skillLevel
    }
  }
`;

const GET_PLAYER_DETAILS_BY_EMAIL_QUERY = gql`
  query getPlayerDetailsByEmailQuery($email: String!) {
    getUserByEmail(email: $email) {
      id
      firstName
      lastName
      email
      inviteOtpCode
      teams {
        id
        name
        captain {
          firstName
          lastName
        }
      }
    }
  }
`;

export const useGetPlayerDetailsByIdQuery = (userId: string) =>
  useQuery(GET_PLAYER_DETAILS_BY_ID_QUERY, {
    variables: {userId},
  });

export const useGetPlayerDetailsByEmailQuery = (email: string) =>
  useQuery(GET_PLAYER_DETAILS_BY_EMAIL_QUERY, {
    variables: {email},
  });

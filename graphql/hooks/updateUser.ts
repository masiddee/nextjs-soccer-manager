import {gql, useMutation} from '@apollo/client';

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userId: String!, $userInput: UserInput!) {
    updateUser(userId: $userId, userInput: $userInput) {
      id
      firstName
      lastName
      email
      preferredPosition
      gender
      birthDate
    }
  }
`;

export const useUpdateUserMutation = () => useMutation(UPDATE_USER_MUTATION);

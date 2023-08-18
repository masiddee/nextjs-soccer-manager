import {gql, useMutation} from '@apollo/client';
import {TEAM_ROSTER_FRAGMENT} from '../fragments';

const REMOVE_PLAYER_MUTATION = gql`
  mutation RemovePlayer($input: PlayerInput!) {
    removePlayer(input: $input) {
      ...teamRosterFields
    }
  }

  ${TEAM_ROSTER_FRAGMENT}
`;

export const useRemovePlayerMutation = () =>
  useMutation(REMOVE_PLAYER_MUTATION);

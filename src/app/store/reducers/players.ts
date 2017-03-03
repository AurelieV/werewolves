import { PlayersActions } from '../../actions/players';

export function players(state: string[] = [], action: any) {
  switch (action.type) {
    case PlayersActions.ADD_PLAYER:
      return state.concat(action.payload);
    default:
      return state;
  }
}

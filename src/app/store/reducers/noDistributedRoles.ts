import { actions, GameState } from '../index';
import { Role } from '../../model';

export function noDistributedRoles(state: Role[] = [], action: any) {
  switch (action.type) {
    case actions.SET_NO_DISTRIBUTED_ROLES:
      return action.payload;
    case actions.SET_GAME_STATE:
      const gameState: GameState = action.payload;
      switch (gameState) {
        case "none":
        case "setRoles":
        case "setPlayers":
        case "attributeRoles":
          return [];
        default:
          return state;
      }
    default:
      return state;
  }
}
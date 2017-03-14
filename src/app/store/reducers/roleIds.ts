import { actions, GameState } from '../index';

export function roleIds(state: number[] = [], action: any) {
  switch (action.type) {
    case actions.SET_ROLES:
      return action.payload;
    case actions.SET_GAME_STATE:
      const gameState: GameState = action.payload;
      switch (gameState) {
        case "none":
          return [];
        default:
          return state;
      }
    default:
      return state;
  }
}

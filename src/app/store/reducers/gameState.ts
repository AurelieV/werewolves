import { actions, GameState } from '../index';

export function gameState(state: GameState = "none", action: any) {
  switch (action.type) {
    case actions.SET_GAME_STATE:
      return action.payload;
    default:
      return state;
  }
}
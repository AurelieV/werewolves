import { actions, GameState } from '../index';

export function nightNumber(state: number = 0, action: any) {
  switch (action.type) {
    case actions.SET_NIGHT_NUMBER:
      return action.payload;
    case actions.SET_GAME_STATE:
      const gameState: GameState = action.payload;
      switch (gameState) {
        case "none":
        case "setRoles":
        case "setPlayers":
          return 0;
        default:
          return state;
      }
    default:
      return state;
  }
}
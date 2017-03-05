import { actions, GameState } from '../index';

export function players(state: string[] = [], action: any) {
  switch (action.type) {
    case actions.SET_PLAYERS:
      return action.payload;
    case actions.SET_GAME_STATE:
      const gameState: GameState = action.payload;
      switch (gameState) {
        case "none":
        case "setRoles":
        case "setPlayers":
          return [];
        default:
          return state;
      }
    default:
      return state;
  }
}

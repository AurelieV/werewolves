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
    case actions.UPDATE_PLAYER:
      const {index, change} = action.payload;
      return state.map((p, i) => {
          if (i === index) {
            return Object.assign(p, change);
          } else {
            return p;
          }
        });
    default:
      return state;
  }
}

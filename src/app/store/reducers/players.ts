import { actions, GameState } from '../index';
import { Player } from '../../model';

export function players(state: Player[] = [], action: any) {
  switch (action.type) {
    case actions.SET_PLAYERS:
      return action.payload;
    case actions.SET_GAME_STATE:
      const gameState: GameState = action.payload;
      switch (gameState) {
        case "none":
          return [];
        case "setRoles":
        case "setPlayers":
            return state.map(p => ({
                name: p.name,
                roleId: null,
                dead: false,
                statusValueIds: []
            }));
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

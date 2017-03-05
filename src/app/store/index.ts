import { combineReducers } from 'redux';

import { Role, Player } from "../model";

// Reducers
import { players } from './reducers/players';
import { availableRoles } from './reducers/availableRoles';
import { gameState } from './reducers/gameState';

export type GameState = "none" | "setRoles" | "setPlayers" | "attributeRoles" | "inProgress";
export interface IAppState {
    players: Player[];
    availableRoles: Role[];
    gameState: GameState;
};

export const actions = {
    SET_ROLES: "SET ROLES",
    SET_GAME_STATE: "SET GAME STATE",
    SET_PLAYERS: "SET PLAYERS"
} 

export const rootReducer = combineReducers<IAppState>({
    players,
    availableRoles,
    gameState
});

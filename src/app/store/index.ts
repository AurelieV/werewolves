import { combineReducers } from 'redux';

import { Role, Player } from "../model";

// Reducers
import { players } from './reducers/players';
import { availableRoles } from './reducers/availableRoles';
import { gameState } from './reducers/gameState';
import { noDistributedRoles } from './reducers/noDistributedRoles';

export type GameState = "none" | "setRoles" | "setPlayers" | "attributeRoles" | "inProgress";
export interface IAppState {
    players: Player[];
    availableRoles: Role[];
    gameState: GameState;
    noDistributedRoles: Role[];
};

export const actions = {
    SET_ROLES: "SET ROLES",
    SET_GAME_STATE: "SET GAME STATE",
    SET_PLAYERS: "SET PLAYERS",
    UPDATE_PLAYER: "UPDATE_PLAYER",
    SET_NO_DISTRIBUTED_ROLES: "SET_NO_DISTRIBUTED_ROLES"
} 

export const rootReducer = combineReducers<IAppState>({
    players,
    availableRoles,
    gameState,
    noDistributedRoles
});

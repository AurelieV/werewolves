import { combineReducers } from 'redux';

import { Role, Player } from "../model";

// Reducers
import { players } from './reducers/players';
import { roleIds } from './reducers/roleIds';
import { gameState } from './reducers/gameState';
import { noDistributedRoleIds } from './reducers/noDistributedRoleIds';

export type GameState = "none" | "setRoles" | "setPlayers" | "attributeRoles" | "inProgress";
export interface IAppState {
    players: Player[];
    roleIds: number[];
    gameState: GameState;
    noDistributedRoleIds: number[];
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
    roleIds,
    gameState,
    noDistributedRoleIds
});

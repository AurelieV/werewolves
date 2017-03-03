import { combineReducers } from 'redux';

// Reducers
import { players } from './reducers/players';

export interface IAppState {
    players: string[];
};

export const rootReducer = combineReducers<IAppState>({
    players
});

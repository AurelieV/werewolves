import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from './index';

@Injectable()
export class PersistStoreService {
    @select() gameState$;
    @select() availableRoles$;
    @select() players$;

    start() {
        this.gameState$.subscribe(gameState => {
            localStorage["gameState"] = gameState;
        });
        this.availableRoles$.subscribe(roles => {
            localStorage["availableRoles"] = JSON.stringify(roles);
        });
        this.players$.subscribe(players => {
            localStorage["players"] = JSON.stringify(players);
        });
    }

    getPersistState(): IAppState {
        return {
            gameState: localStorage["gameState"] || "none",
            availableRoles: JSON.parse(localStorage["availableRoles"] || null) || [],
            players: JSON.parse(localStorage["players"] || null) || []
        };
    }
}
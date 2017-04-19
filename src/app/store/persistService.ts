import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from './index';
import { currentVersion } from '../index';

const defaultState: IAppState = {
    gameState: "none",
    roleIds: [],
    players: [],
    noDistributedRoleIds: [],
    nightNumber: 1,
    instructions: [ "" ]
}

@Injectable()
export class PersistStoreService {

    constructor(private ngRedux: NgRedux<IAppState>) {}

    start() {
        this.ngRedux.select<IAppState>().subscribe(state => {
            localStorage["state"] = JSON.stringify(state);
        });
        localStorage["version"] = currentVersion;
    }

    getPersistState(): IAppState {
        const persistStateVersion = localStorage["version"];
        const persistState = localStorage["state"] ? JSON.parse(localStorage["state"]) : defaultState;
        
        return currentVersion === persistStateVersion ? persistState : defaultState;
    }
}
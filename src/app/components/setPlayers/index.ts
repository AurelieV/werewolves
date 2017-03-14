import { Component } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';

import { Player } from '../../model';
import { IAppState, actions } from '../../store';

@Component({
    selector: "set-players",
    templateUrl: './setPlayers.html',
    styleUrls: [ 'setPlayers.scss' ]
})
export class SetPlayersComponent {
    @select() roleIds$: Observable<number[]>;
    players: Player[] = [];

    constructor(private ngRedux: NgRedux<IAppState>) {
        this.roleIds$.subscribe(roleIds => {
            this.players = roleIds.map(r => ({ 
                name: "",
                roleId: null,
                dead: false,
                statusValueIds: [] 
            }));

            this.ngRedux.select<Player[]>("players").subscribe(players => {
                if (players.length === 0) return;
                players.forEach((player, index) => {
                    if (index < this.players.length) {
                        this.players[index] = Object.assign({}, player)
                    } else {
                        this.players.push(Object.assign({}, player));
                    }
                });
            });
        });
    }

    validate() {
        const players = this.players.filter(p => p.name);
        this.ngRedux.dispatch({ type: actions.SET_PLAYERS, payload: players });
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "attributeRoles" });
    }

    cancel() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setRoles" });
    }
}

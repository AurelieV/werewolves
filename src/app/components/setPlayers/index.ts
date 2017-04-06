import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Player } from '../../model';
import { IAppState, actions } from '../../store';

@Component({
    selector: "set-players",
    templateUrl: './setPlayers.html',
    styleUrls: [ 'setPlayers.scss' ]
})
export class SetPlayersComponent implements OnInit, OnDestroy {
    @select() roleIds$: Observable<number[]>;
    players: any[] = [];
    private subscriptions: Subscription[] = [];

    constructor(private ngRedux: NgRedux<IAppState>) {}

    ngOnInit() {
        this.subscriptions.push(this.ngRedux.select<IAppState>().subscribe(state => {
            const roleIds = state.roleIds;
            const players = state.players;

            this.players = roleIds.map(r => ({ name: "" }));
            if (players.length === 0) return;
            players.forEach((player, index) => {
                if (index < this.players.length) {
                    this.players[index] = { name: player.name };
                } else {
                    this.players = this.players.concat({ name: player.name });
                }
            });
        }));
    }

    validate() {
        const players: Player[] = this.players
            .filter(p => p.name)
            .map(p => ({
                name: p.name,
                roleId: null,
                statusIds: [],
                dead: false
            }));
        this.ngRedux.dispatch({ type: actions.SET_PLAYERS, payload: players });
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "attributeRoles" });
    }

    cancel() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setRoles" });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}

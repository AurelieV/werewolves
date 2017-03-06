import { Component } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Player, Role, StatusValue, PlayerStatus } from '../../model';
import { IAppState, actions } from '../../store';
import { RoleZoomComponent } from '../role/zoom';

interface PlayerWithActions extends Player {
    actions: PlayerStatus[];
}

@Component({
    selector: "game",
    templateUrl: './game.html',
    styleUrls: [ 'game.scss' ]
})
export class GameComponent {
    @select() players$: Observable<Player[]>;
    @select() availableRoles$: Observable<Role[]>;
    @select() noDistributedRoles$: Observable<Role[]>;

    players: PlayerWithActions[] = [];
    availableRoles: Role[] = [];
    noDistributedRoles: Role[] = [];
    availableStatus: PlayerStatus[] = [];
    
    constructor(private ngRedux: NgRedux<IAppState>, private dialog: MdDialog) {
        this.players$.subscribe(players => {
            this.players = players.map(p => Object.assign({}, p, {actions: this.getActions(p)}));
        });
        this.availableRoles$.subscribe(roles => {
            this.availableRoles = roles;
            this.availableStatus = this.getAvailableStatus();
            this.players = this.players.map(p => Object.assign({}, p, {actions: this.getActions(p)}));
        });
        this.noDistributedRoles$.subscribe(roles => this.noDistributedRoles = roles);
    }

    openZoom(role: Role) {
        const zoom = this.dialog.open(RoleZoomComponent);
        zoom.componentInstance.role = role;
    }

    kill(index: number) {
        this.ngRedux.dispatch({ type: actions.UPDATE_PLAYER, payload: {
            index,
            change: { dead: true }
        }});
    }

    resurrect(index: number) {
        this.ngRedux.dispatch({ type: actions.UPDATE_PLAYER, payload: {
            index,
            change: { dead: false }
        }});
    }

    getAvailableStatus() {
        return this.availableRoles
            .reduce((acc, r) => {
                const values = r.othersStatus.reduce((acc, s) => {
                    return acc.concat(s.values.map(v => ({status: s, value: v})));
                }, [] as PlayerStatus[]);
                return acc.concat(values);
            }, [] as PlayerStatus[]);
    }

    getActions(player: Player): PlayerStatus[] {
        let result: PlayerStatus[] = [];
        const currentValues = player.status.map(ps => ps.value.name);
        const currentStatus = player.status.map(ps => ps.status.name);
        player.role.ownStatus.forEach(s => {
            result = result.concat(
                s.values
                .filter(v => {
                    if (!v.actionName) return false;
                    if (v.name) return currentValues.indexOf(v.name) === -1;
                    return currentStatus.indexOf(s.name) > -1;
                })
                .map(v => ({ status: s, value: v }))
            );
        });
        result = result.concat(
            this.availableStatus.filter(v => {
                    if (!v.value.actionName) return false;
                    if (v.value.name) return currentValues.indexOf(v.value.name) === -1;
                    return currentStatus.indexOf(v.status.name) > -1;
                })
        );

        return result;
    }

    doAction(player: Player, index: number, status: PlayerStatus) {
        const playerStatus = player.status.filter(s => s.status.name !== status.status.name);
        if (status.value.name) playerStatus.push(status);
        this.ngRedux.dispatch({ type: actions.UPDATE_PLAYER, payload: {
            index,
            change: { status: playerStatus } 
        }});
    }

    closeGame() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "none" });
    }
}
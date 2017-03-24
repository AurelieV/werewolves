import { Component } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Player, Role, StatusValue, Status } from '../../model';
import { IAppState, actions } from '../../store';
import { RoleZoomComponent } from '../zoom';
import { roles, statuses, statusValues } from '../../data';

interface PlayerWithActions extends Player {
    actions: number[];
}

@Component({
    selector: "game",
    templateUrl: './game.html',
    styleUrls: [ 'game.scss' ]
})
export class GameComponent {
    @select() players$: Observable<Player[]>;
    @select() roleIds$: Observable<number[]>;
    @select() noDistributedRoleIds$: Observable<number[]>;

    players: PlayerWithActions[] = [];
    roleIds: number[] = [];
    noDistributedRoleIds: number[] = [];
    availableStatusValues: number[] = [];

    roles: Role[] = roles;
    statuses: Status[] = statuses;
    statusValues: StatusValue[] = statusValues;

    constructor(private ngRedux: NgRedux<IAppState>, private dialog: MdDialog) {
        this.players$.subscribe(players => {
            this.players = players.map(p => Object.assign({}, p, {actions: this.getActions(p)}));
        });
        this.roleIds$.subscribe(roleIds => {
            this.roleIds = roleIds;
            this.availableStatusValues = this.getAvailableStatusValues();
            this.players = this.players.map(p => Object.assign({}, p, {actions: this.getActions(p)}));
        });
        this.noDistributedRoleIds$.subscribe(roleIds => this.noDistributedRoleIds = roleIds);
    }

    openZoom(roleId: number) {
        const zoom = this.dialog.open(RoleZoomComponent);
        zoom.componentInstance.role = roles[roleId];
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

    getAvailableStatusValues(): number[] {
        return this.roleIds
            .reduce((acc, roleId) => {
                const values = roles[roleId].othersStatusIds
                    .reduce((acc, id) => acc.concat(statuses[id].valueIds), [] as number[]);
                return acc.concat(values);
            }, [] as number[]);
    }

    getActions(player: Player): number[] {
        let result: number[] = [];
        const currentStatusIds = player.statusValueIds.map(id => statusValues[id].statusId);
        roles[player.roleId].ownStatusIds.forEach(statusId => {
            result = result.concat(
                statuses[statusId].valueIds
                .filter(id => {
                    const value = statusValues[id];
                    // Si c'est un état possible, on peut effectuer l'action si on est pas déjà dans cet état
                    if (value.name) return player.statusValueIds.indexOf(id) === -1;

                    // Si c'est un état néant, on peut effectuer l'action si on a déjà un statut de même type
                    // différent
                    return currentStatusIds.indexOf(value.statusId) > -1 && player.statusValueIds.indexOf(id) === -1;
                })
            );
        });
        result = result.concat(
            this.availableStatusValues.filter(valueId => {
                const value = statusValues[valueId];
                // Si c'est un état possible, on peut effectuer l'action si on est pas déjà dans cet état
                if (value.name) return player.statusValueIds.indexOf(valueId) === -1;

                // Si c'est un état néant, on peut effectuer l'action si on a déjà un statut de même type
                // différent
                return currentStatusIds.indexOf(value.statusId) > -1 && player.statusValueIds.indexOf(valueId) === -1;
            })
        );

        return result;
    }

    doAction(player: Player, index: number, statusValueId: number) {
        const value = statusValues[statusValueId];
        const playerStatus = player.statusValueIds.filter(id => statusValues[id].statusId !== value.statusId);
        if (statusValues[statusValueId].name) playerStatus.push(statusValueId);
        this.ngRedux.dispatch({ type: actions.UPDATE_PLAYER, payload: {
            index,
            change: { statusValueIds: playerStatus }
        }});
    }

    closeGame() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "none" });
    }

    restartGame() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setRoles"});
    }
}

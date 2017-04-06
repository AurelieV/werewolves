import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Player, Role, Status } from '../../model';
import { IAppState, actions } from '../../store';
import { RoleZoomComponent } from '../zoom';
import { roles, statuses } from '../../data';

interface Action {
    name: string;
    type: "delete" | "add",
    statusId: number;
}
interface PlayerWithActions extends Player {
    actions: Action[];
}

@Component({
    selector: "game",
    templateUrl: './game.html',
    styleUrls: [ 'game.scss' ]
})
export class GameComponent implements OnInit, OnDestroy {
    players: PlayerWithActions[] = [];
    roleIds: number[] = [];
    noDistributedRoleIds: number[] = [];
    availableStatuses: number[] = [];

    roles: Role[] = roles;
    statuses: Status[] = statuses;

    private subscriptions: Subscription[] = [];

    constructor(private ngRedux: NgRedux<IAppState>, private dialog: MdDialog) {}

    ngOnInit() {
        this.subscriptions.push(this.ngRedux.select<IAppState>().subscribe(state => {
            this.noDistributedRoleIds = state.noDistributedRoleIds;
            this.roleIds = state.roleIds;
            this.availableStatuses = this.getAvailableStatuses();
            this.players = state.players.map(p => Object.assign({}, p, {actions: this.getActions(p)}));
        }));
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

    getAvailableStatuses(): number[] {
        return this.roleIds
            .reduce((acc, roleId) => acc.concat(roles[roleId].othersStatusIds), [] as number[])
            .filter((id, i, tab) => tab.indexOf(id) === i);
    }

    getActions(player: Player): Action[] {
        let result: Action[] = [];
        roles[player.roleId].ownStatusIds
            .concat(this.availableStatuses)
            .filter((id, i, tab) => tab.indexOf(id) === i)
            .forEach(id => {
                const status = statuses[id];
                const hasAlready = player.statusIds.indexOf(id) > -1;
                if (hasAlready && status.deleteActionName) {
                    result.push({
                        statusId: id,
                        type: "delete",
                        name: status.deleteActionName
                    });
                }
                if (!hasAlready) {
                    const isNotCompatible = 
                        player.statusIds.findIndex(i => status.noCompatibleWith.indexOf(i) > -1) > -1;
                    if (isNotCompatible) {
                        return;
                    }
                    result.push({
                        statusId: id,
                        type: "add",
                        name: status.actionName
                    });
                }
            });

        return result;
    }

    doAction(player: Player, index: number, action: Action) {
        let newStatusIds: number[];
        if (action.type === "delete") {
            newStatusIds = player.statusIds.filter(i => i !== action.statusId);
        } else {
            newStatusIds = player.statusIds.concat(action.statusId);
        }
        this.ngRedux.dispatch({ type: actions.UPDATE_PLAYER, payload: {
            index,
            change: { statusIds: newStatusIds }
        }});
    }

    closeGame() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "none" });
    }

    restartGame() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setRoles"});
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}

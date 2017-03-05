import { Component } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Player, Role } from '../../model';
import { IAppState, actions } from '../../store';
import { RoleZoomComponent } from '../role/zoom';

@Component({
    selector: "game",
    templateUrl: './game.html',
    styleUrls: [ 'game.scss' ]
})
export class GameComponent {
    @select() players$: Observable<Player[]>;
    @select() availableRoles$: Observable<Role[]>;
    players: Player[] = [];
    availableRoles: Role[] = [];
    noDistributedRoles: Role[] = [];
    
    constructor(private ngRedux: NgRedux<IAppState>, private dialog: MdDialog) {
        this.players$.subscribe(players => {
            this.players = players;
            this.setNoDistributedRoles();
        });
        this.availableRoles$.subscribe(roles => {
            this.availableRoles = roles;
            this.setNoDistributedRoles();
        });
    }

    setNoDistributedRoles() {
        if (this.players.length === 0) return;
        if (this.availableRoles.length === 0) return;
        const roles = Array.from(this.availableRoles);
        this.players.forEach(p => {
            const index = roles.findIndex(r => r.id === p.role.id);
            roles.splice(index, 1);
        })
        this.noDistributedRoles = roles;
    }

    openZoom(role: Role) {
        const zoom = this.dialog.open(RoleZoomComponent);
        zoom.componentInstance.role = role;
    }

    closeGame() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "none" });
    }
}
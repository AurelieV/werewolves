import { Component } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';

import { Player, Role } from '../../model';
import { IAppState, actions } from '../../store';

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
    
    constructor(private ngRedux: NgRedux<IAppState>) {
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

    closeGame() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "none" });
    }
}
import { Component, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NgRedux } from "@angular-redux/store";

import { roles } from '../../data';
import { Role } from '../../model';
import { IAppState, actions } from '../../store';

interface RoleCount {
    role: Role;
    count: number;
}

@Component({
    selector: "set-roles",
    templateUrl: './setRoles.html',
    styleUrls: [ 'setRoles.scss' ]
})
export class SetRolesComponent {
    @Output() closeGame = new EventEmitter();
    @ViewChild("confirmation") confirmationTemplate: TemplateRef<any>;
    roles: Role[] = roles;
    counts: { [id: number]: number } = {};
    confirmationRef: MdDialogRef<any>;
    rolesCount: RoleCount[] = [];
    cardsNumber: number = 0;

    constructor(private dialog: MdDialog, private ngRedux: NgRedux<IAppState>) {}

    increment(id: number) {
        const current = this.counts[id] || 0;
        this.counts[id] = current + 1;
    }

    decrement(id: number) {
        if (this.counts[id] === 1) {
            delete this.counts[id];
        }
        else {
            this.counts[id] = this.counts[id] - 1;
        }
    }

    confirm() {
        this.rolesCount = [];
        Object.keys(this.counts).forEach(id => {
            const role = roles.find(r => r.id == parseInt(id));
            this.rolesCount.push({
                role,
                count: this.counts[id]
            });
        });
        this.cardsNumber = this.rolesCount.reduce((acc, v) => acc + v.count, 0);
        this.confirmationRef = this.dialog.open(this.confirmationTemplate);
    }

    validate() {
        const roles: Role[] = [];
        this.rolesCount.forEach(rc => {
            for (let i = 0; i < rc.count; i++) {
                roles.push(rc.role);
            }
        });
        this.ngRedux.dispatch({type: actions.SET_ROLES, payload: roles});
        this.ngRedux.dispatch({type: actions.SET_GAME_STATE, payload: "setPlayers"});
        this.confirmationRef.close();
    }

    cancelConfirm() {
        this.confirmationRef.close();
    }

    cancel() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "none" });
    }
}
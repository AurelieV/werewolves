import { Component, ViewChild, TemplateRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NgRedux } from "@angular-redux/store";
import { Subscription } from 'rxjs/Subscription';

import { roles } from '../../data';
import { Role } from '../../model';
import { IAppState, actions } from '../../store';

@Component({
    selector: "set-roles",
    templateUrl: './setRoles.html',
    styleUrls: [ 'setRoles.scss' ]
})
export class SetRolesComponent implements OnInit, OnDestroy {
    @ViewChild("confirmation") confirmationTemplate: TemplateRef<any>;

    roles: Role[] = roles;
    counts: { [id: number]: number } = {};
    confirmationRef: MdDialogRef<any>;
    
    private subscriptions: Subscription[] = [];

    constructor(private dialog: MdDialog, private ngRedux: NgRedux<IAppState>) {}

    ngOnInit() {
        this.subscriptions.push(this.ngRedux.select<number[]>("roleIds").subscribe(roleIds => {
            if (roleIds.length === 0) return;
            this.counts = {};
            roleIds.forEach(id => this.counts[id] = (this.counts[id] || 0) + 1)
        }));
    }

    increment(id: number) {
        this.counts[id] = (this.counts[id] || 0) + 1;
    }

    decrement(id: number) {
        if (this.counts[id] === 1) {
            delete this.counts[id];
        }
        else {
            this.counts[id] = this.counts[id] - 1;
        }
    }

    get cardsNumber(): number {
        return Object.keys(this.counts).reduce((count, i) => count + this.counts[i], 0);
    }

    get countsKeys() {
        return Object.keys(this.counts);
    }

    confirm() {
        this.confirmationRef = this.dialog.open(this.confirmationTemplate);
    }

    validate() {
        const roles: number[] = [];
        Object.keys(this.counts).forEach(key => {
            for (let i = 0; i < this.counts[key]; i++) {
                roles.push(parseInt(key));
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

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}

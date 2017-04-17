import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/take";
import { MdSelectChange } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Role, Player } from '../../model';
import { IAppState, actions } from '../../store';
import { roles, statuses } from '../../data';

interface Assignation {
    player: Player;
    cardIndex: number;
}
interface Card {
    roleId: number;
    cardIndex: number;
    taken: boolean;
}

@Component({
    selector: "attribute-roles",
    templateUrl: './attributeRoles.html',
    styleUrls: [ 'attributeRoles.scss' ]
})
export class AttributeRolesComponent implements OnDestroy {
    assignations: Assignation[] = [];
    cards: Card[] = [];
    availableCards: Card[] = [];
    roles: Role[] = roles;

    private subscriptions: Subscription[] = [];

    constructor(private ngRedux: NgRedux<IAppState>) {
        const state = this.ngRedux.getState();
        this.cards = state.roleIds.map((id, index) => ({
            roleId: id,
            cardIndex: index,
            taken: false
        }));
        this.availableCards = Array.from(this.cards);
        this.assignations = state.players.map((p, i) => {
            if (p.roleId === null) return {player: p, cardIndex: -1};
            const card = this.availableCards.find(c => c.roleId === p.roleId);
            card.taken = true;
            this.availableCards = this.availableCards.filter(c => !c.taken);

            return {player: p, cardIndex: card.cardIndex};
        });
    }

    onSelectChange() {
        const takenCardsIndex = this.assignations.map(a => a.cardIndex).filter(i => i !== -1);
        this.cards.forEach(c => c.taken = takenCardsIndex.indexOf(c.cardIndex) > -1);
        this.availableCards = this.cards.filter(c => !c.taken);
    }

    validate() {
        const notAssigned = this.assignations.filter(a => a.cardIndex === -1);
        notAssigned.forEach(a => {
            const randIndex = Math.floor(Math.random() * this.availableCards.length);
            a.cardIndex = this.availableCards[randIndex].cardIndex;
            this.onSelectChange();
        });
        const players = this.assignations.map(a => Object.assign(
            {},
            a.player,
            { 
                roleId: this.cards[a.cardIndex].roleId,
                statusIds: this.roles[this.cards[a.cardIndex].roleId].initialStatusIds || []
            }
        ));
        const noDistributed = this.availableCards.map(c => c.roleId);
        this.ngRedux.dispatch({ type: actions.SET_PLAYERS, payload: players });
        this.ngRedux.dispatch({
            type: actions.SET_NO_DISTRIBUTED_ROLES,
            payload: noDistributed
        });
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "inProgress" });
    }

    cancel() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setPlayers" });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
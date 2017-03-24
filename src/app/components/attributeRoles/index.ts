import { Component } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';
import { MdSelectChange } from '@angular/material';

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
export class AttributeRolesComponent {

    assignations: Assignation[] = [];
    cards: Card[] = [];
    availableCards: Card[] = [];
    roles: Role[] = roles;
    loaded: false;

    constructor(private ngRedux: NgRedux<IAppState>) {}

    ngOnInit() {
        this.ngRedux.select<IAppState>().subscribe(state => {
            console.log("pouet");
            this.loaded = false;
            this.cards = state.roleIds.map((id, index) => ({
                roleId: id,
                cardIndex: index,
                taken: false
            }));
            this.availableCards = Array.from(this.cards);
            this.assignations = state.players.map((p, i) => {
                if (p.roleId) {
                    return { player: p, cardIndex: this.cards.findIndex(c => c.roleId === p.roleId) };
                }
                else {
                    return { player: p, cardIndex: -1 }
                }
            });
            this.onSelectChange();
            this.loaded = true;
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
            { roleId: this.cards[a.cardIndex].roleId }
        ));
        players.forEach((p: Player) => {
            if (roles[p.roleId].ownStatusIds.length > 0) {
                p.statusValueIds = [];
                roles[p.roleId]
                    .ownStatusIds
                    .forEach(statusId => p.statusValueIds.push(statuses[statusId].valueIds[0]));
            }
        })
        this.ngRedux.dispatch({ type: actions.SET_PLAYERS, payload: players });
        this.ngRedux.dispatch({
            type: actions.SET_NO_DISTRIBUTED_ROLES,
            payload: this.availableCards.map(c => c.roleId)
        });
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "inProgress" });
    }

    cancel() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setPlayers" });
    }
}
import { Component } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';
import { MdSelectChange } from '@angular/material';

import { Role, Player } from '../../model';
import { IAppState, actions } from '../../store';

interface Assignation {
    player: Player;
    cardIndex: number;
}
interface Card {
    role: Role;
    cardIndex: number;
    taken: boolean;
}

@Component({
    selector: "attribute-roles",
    templateUrl: './attributeRoles.html',
    styleUrls: [ 'attributeRoles.scss' ]
})
export class AttributeRolesComponent {
    @select() availableRoles$: Observable<Role[]>;
    @select() players$: Observable<Player[]>;
    assignations: Assignation[] = [];
    cards: Card[] = [];
    availableCards: Card[] = [];

    constructor(private ngRedux: NgRedux<IAppState>) {
        this.players$.subscribe(players => {
            this.assignations = players.map((p, i) => ({player: p, cardIndex: -1}));
        });
        this.availableRoles$.subscribe(roles => {
            this.cards = roles.map((r, i) => ({
                role: r,
                cardIndex: i,
                taken: false
            }));
            this.availableCards = Array.from(this.cards);
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
            { role: this.cards[a.cardIndex].role }
        ));
        this.ngRedux.dispatch({ type: actions.SET_PLAYERS, payload: players });
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "inProgress" });
    }

    cancel() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setPlayers" });
    }
}
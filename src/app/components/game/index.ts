import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Player, Role, Status, OrderInstructions } from '../../model';
import { IAppState, actions } from '../../store';
import { RoleZoomComponent } from '../zoom';
import { roles, statuses } from '../../data';

import * as FileSaver from "file-saver";
import * as moment from "moment";

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
    winner: string;

    roles: Role[] = roles;
    statuses: Status[] = statuses;

    @ViewChild("saveGameTemplate") private saveGameTemplate: TemplateRef<any>;
    @ViewChild("restartGameTemplate") private restartGameTemplate: TemplateRef<any>;
    private saveGameModalRef: MdDialogRef<any>;
    private restartGameModalRef: MdDialogRef<any>;
    private subscriptions: Subscription[] = [];

    private isNight: boolean;
    private currentMessage: string;
    private nightNumber: number;
    private instructions: string[] = [];

    constructor(private ngRedux: NgRedux<IAppState>, private dialog: MdDialog, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        const state = this.ngRedux.getState();
        this.noDistributedRoleIds = state.noDistributedRoleIds;
        this.roleIds = state.roleIds;
        this.availableStatuses = this.getAvailableStatuses();
        this.instructions = state.instructions;
        this.nightNumber = state.nightNumber;
        this.isNight = state.instructions.length > 0;
        this.currentMessage = this.instructions.length ? this.instructions[0] : "C'est le jour";
        this.subscriptions.push(this.ngRedux.select<IAppState>().subscribe(state => {
            this.players = state.players.map(p => Object.assign({}, p, {actions: this.getActions(p)}));
        }));
        this.subscriptions.push(this.ngRedux.select<number>("nightNumber").subscribe(i => {
            this.setNightNumber(i);
        }));
        this.subscriptions.push(this.ngRedux.select<string[]>("instructions").subscribe(instructions => {
            this.setInstructions(instructions);
        }));
    }

    setInstructions(instructions: string[]) {
        this.instructions = instructions;
        if (instructions.length === 0) {
            this.currentMessage = "C'est le jour";
            this.isNight = false;
        } else {
            this.currentMessage = instructions[0];
            this.isNight = true;
        }
        this.cd.detectChanges();
    }

    setNightNumber(i: number) {
        if (this.nightNumber === i) return;
        this.nightNumber = i;
        let orderedInstructions = this.players
            .filter(player => !player.dead)
            .map(player => player.roleId)
            .filter((id, i, tab) => tab.indexOf(id) === i)
            .map(id => roles[id])
            .map(role => role.getInstructions ? role.getInstructions(i) : { instructions: [], priority: 0})
        ;
        orderedInstructions = orderedInstructions.concat([
            {
                priority: 140,
                instructions: [
                    "Les loups garous se réveillent",
                    "Loups garous désignez moi votre cible"
                ]
            }, 
            {
                priority: 155,
                instructions: [ "Loups garous rendormez vous" ]
            }
        ]);

        // S'il y a des amoureux
        const hasLovers = this.players.filter(player => !player.dead && player.statusIds.indexOf(0) > -1).length > 0;
        if (hasLovers) {
            orderedInstructions = orderedInstructions.concat({
                priority: 80,
                instructions: [
                    "Les amoureux se réveillent",
                    "Les amoureux se rendorment"
                ]
            });
        }
        
        orderedInstructions = orderedInstructions.sort((a, b) => {
                if (a.priority === b.priority) return 0;
                return a.priority > b.priority ? 1 : -1;
        });
        let instructions = orderedInstructions.reduce((acc, val) => acc.concat(val.instructions), []);
        instructions = [ "Le village s'endort" ].concat(instructions);
        instructions = instructions.concat("Le village se réveille");
        
        this.ngRedux.dispatch({ type: actions.SET_INSTRUCTIONS, payload: instructions});
    }

    next() {
        const [first, ...others] = this.instructions;
        if (!this.isNight) {
            this.ngRedux.dispatch({ type: actions.SET_NIGHT_NUMBER, payload: this.nightNumber + 1});
            return;
        }
       this.ngRedux.dispatch({ type: actions.SET_INSTRUCTIONS, payload: others || [] });
    }

    openZoom(roleId: number, name: string) {
        const zoom = this.dialog.open(RoleZoomComponent);
        const classes = document.body.className;
        zoom.componentInstance.role = roles[roleId];
        zoom.componentInstance.player = name;
        document.body.className += "open-zoom";
        history.pushState("back", null, null); // for handle back button history has to be not empty
        const closeZoom: EventListener = e => {
            e.preventDefault();
            e.stopPropagation();
            zoom.close();
        }
        const listenBack = window.addEventListener("popstate", closeZoom);
        zoom.afterClosed().subscribe(_ => {
            document.body.className = classes;
            window.removeEventListener("popstate", closeZoom);
        })
    }

    changeRoles() {
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "attributeRoles"});
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
            newStatusIds = player.statusIds
                .filter(id => statuses[id].noCompatibleWith.indexOf(action.statusId) === -1)
                .concat(action.statusId);
        }
        this.ngRedux.dispatch({ type: actions.UPDATE_PLAYER, payload: {
            index,
            change: { statusIds: newStatusIds }
        }});
    }

    closeGame() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "none" });
    }

    restartGame() {
        this.restartGameModalRef = this.dialog.open(this.restartGameTemplate);
        this.restartGameModalRef.afterClosed().subscribe(action => {
            if (action === "cancel") return;
            if (action === "not-save") {
                this.subscriptions.forEach(s => s.unsubscribe());
                this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setRoles"});
                return;
            }
            this.saveGame(true);
        });
    }

    saveGame(restartAfter: boolean = false) {
        this.saveGameModalRef = this.dialog.open(this.saveGameTemplate);
        const players = this.ngRedux.getState().players;
        this.saveGameModalRef.afterClosed().subscribe(isConfirmed => {
            if (!isConfirmed) {
                if (restartAfter) this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setRoles"});
                return;
            }
            let data: any = {
                players,
                winner: this.winner
            }
            data.players.forEach(p => {
                p.role = roles[p.roleId].name,
                p.statuses = p.statusIds.map(id => statuses[id].name)
            });
            const blob = new Blob([JSON.stringify(data, null, 4)], {type: "application/json"});
            FileSaver.saveAs(blob, `LG-${moment().format("DDMMMYY")}-${moment().format('X')}`);
            if (restartAfter) this.ngRedux.dispatch({ type: actions.SET_GAME_STATE, payload: "setRoles"});
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}

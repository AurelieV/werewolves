import { Component, Inject, OnInit } from '@angular/core';
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from 'rxjs/Observable';

import { IAppState, GameState, actions } from "./store";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: [ './app.scss' ]
})
export class AppComponent implements OnInit {
  @select() gameState$: Observable<GameState>;
  gameState: GameState;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.gameState$.subscribe(gameState => this.gameState = gameState);
  }

  startGame() {
    this.ngRedux.dispatch({type: actions.SET_GAME_STATE, payload: "setRoles"});
  }
}

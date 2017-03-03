import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../store';

@Injectable()
export class PlayersActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}

  static ADD_PLAYER = 'ADD_PLAYER';
}

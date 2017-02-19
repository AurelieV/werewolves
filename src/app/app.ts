import { Component, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

import { Role } from "./model";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: [ './app.scss' ]
})
export class AppComponent {
  roles: FirebaseListObservable<Role[]>;

  constructor(af: AngularFire) {
    this.roles = af.database.list('/roles')
  }
}
